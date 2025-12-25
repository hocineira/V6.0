// Service de stockage JSON local pour remplacer MongoDB
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class JSONStorage {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.dataFile = path.join(this.dataDir, 'rss-cache.json');
    this.lockFile = path.join(this.dataDir, '.lock');
    this.ensureDataDir();
    this.secureDataDir();
  }

  ensureDataDir() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true, mode: 0o700 }); // Restricted permissions
      }
    } catch (error) {
      console.error('Erreur création répertoire data:', error);
    }
  }

  // Secure the data directory with proper permissions
  secureDataDir() {
    try {
      // Set restrictive permissions on data directory (only owner can read/write/execute)
      if (process.platform !== 'win32') {
        fs.chmodSync(this.dataDir, 0o700);
      }
      
      // Set restrictive permissions on data file if it exists
      if (fs.existsSync(this.dataFile)) {
        if (process.platform !== 'win32') {
          fs.chmodSync(this.dataFile, 0o600); // Only owner can read/write
        }
      }
    } catch (error) {
      console.error('Erreur sécurisation répertoire:', error);
    }
  }

  // Acquire lock for file operations (prevent race conditions)
  async acquireLock(timeout = 5000) {
    const startTime = Date.now();
    while (fs.existsSync(this.lockFile)) {
      if (Date.now() - startTime > timeout) {
        throw new Error('Lock acquisition timeout');
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    fs.writeFileSync(this.lockFile, String(process.pid), { mode: 0o600 });
  }

  // Release lock
  releaseLock() {
    try {
      if (fs.existsSync(this.lockFile)) {
        fs.unlinkSync(this.lockFile);
      }
    } catch (error) {
      console.error('Erreur libération lock:', error);
    }
  }

  // Validate and sanitize data before loading
  validateData(data) {
    // Basic structure validation
    if (!data || typeof data !== 'object') {
      return false;
    }

    if (!Array.isArray(data.updates)) {
      return false;
    }

    // Validate each update entry
    for (const update of data.updates) {
      if (!update.title || !update.link || !update.id) {
        return false;
      }
      
      // Validate no dangerous content
      const dangerousPatterns = [/<script/i, /javascript:/i, /onerror=/i, /onclick=/i];
      const textToCheck = JSON.stringify(update);
      
      for (const pattern of dangerousPatterns) {
        if (pattern.test(textToCheck)) {
          console.warn('Dangerous content detected in update data');
          return false;
        }
      }
    }

    return true;
  }

  async loadData() {
    await this.acquireLock();
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf-8');
        const parsed = JSON.parse(data);
        
        // Validate data before using it
        if (!this.validateData(parsed)) {
          console.error('Invalid or potentially dangerous data detected');
          return {
            updates: [],
            lastUpdated: new Date(),
            version: '1.0'
          };
        }
        
        // Convert date strings back to Date objects for consistency
        if (parsed.updates) {
          parsed.updates = parsed.updates.map(update => ({
            ...update,
            published_date: new Date(update.published_date),
            created_at: new Date(update.created_at),
            updated_at: new Date(update.updated_at)
          }));
        }
        
        return parsed;
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      this.releaseLock();
    }
    
    return {
      updates: [],
      lastUpdated: new Date(),
      version: '1.0'
    };
  }

  async saveData(data) {
    await this.acquireLock();
    try {
      // Validate before saving
      if (!this.validateData(data)) {
        console.error('Attempted to save invalid data');
        return false;
      }

      // Prepare data for JSON serialization
      const dataToSave = {
        ...data,
        updates: data.updates.map(update => ({
          ...update,
          published_date: update.published_date instanceof Date ? update.published_date.toISOString() : update.published_date,
          created_at: update.created_at instanceof Date ? update.created_at.toISOString() : update.created_at,
          updated_at: update.updated_at instanceof Date ? update.updated_at.toISOString() : update.updated_at
        })),
        lastUpdated: new Date().toISOString()
      };

      // Write to temp file first, then rename (atomic operation)
      const tempFile = this.dataFile + '.tmp';
      fs.writeFileSync(tempFile, JSON.stringify(dataToSave, null, 2), { 
        encoding: 'utf-8',
        mode: 0o600 // Secure permissions
      });
      
      // Atomic rename
      fs.renameSync(tempFile, this.dataFile);
      
      return true;
    } catch (error) {
      console.error('Erreur sauvegarde données:', error);
      return false;
    } finally {
      this.releaseLock();
    }
  }

  async saveWindowsUpdate(updateData) {
    // Wrapper for bulk update to maintain backward compatibility if needed, 
    // but ideally should not be used in loops.
    return this.saveWindowsUpdatesBulk([updateData]);
  }

  async saveWindowsUpdatesBulk(newUpdates) {
    try {
      const data = await this.loadData();
      let addedCount = 0;
      let updatedCount = 0;
      
      for (const updateData of newUpdates) {
         // Convert dates to Date objects if they're strings
        if (typeof updateData.published_date === 'string') {
            updateData.published_date = new Date(updateData.published_date);
        }

        // Check if update already exists
        const existingIndex = data.updates.findIndex(existing => 
            existing.title === updateData.title || existing.link === updateData.link
        );

        if (existingIndex !== -1) {
            // Update existing
            updateData.updated_at = new Date();
            // Preserve original created_at
            if (data.updates[existingIndex].created_at) {
                updateData.created_at = data.updates[existingIndex].created_at;
            }
            data.updates[existingIndex] = { ...data.updates[existingIndex], ...updateData };
            updatedCount++;
        } else {
            // Add new
            updateData.id = updateData.id || this.generateId();
            updateData.created_at = new Date();
            updateData.updated_at = new Date();
            data.updates.push(updateData);
            addedCount++;
        }
      }
      
      // OPTIMIZATION: Limit total stored updates to prevent file from growing indefinitely
      // Keep last 1000 updates (generous buffer)
      if (data.updates.length > 1000) {
          // Sort by date desc before slicing to keep newest
          data.updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
          data.updates = data.updates.slice(0, 1000);
      }

      await this.saveData(data);
      return { added: addedCount, updated: updatedCount };
    } catch (error) {
      console.error('Erreur sauvegarde updates groupés:', error);
      return null;
    }
  }

  async getWindowsUpdates(category = null, limit = 50, sortBy = 'published_date') {
    try {
      const data = await this.loadData();
      let updates = [...data.updates];

      // Filter by category
      if (category) {
        updates = updates.filter(update => update.category === category);
      }

      // Sort by specified field
      if (sortBy === 'published_date') {
        updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
      }

      // Limit results
      return updates.slice(0, limit);
    } catch (error) {
      console.error('Erreur récupération updates:', error);
      return [];
    }
  }

  async getLatestUpdates(limit = 10) {
    return this.getWindowsUpdates(null, limit, 'published_date');
  }

  async getUpdateStats() {
    try {
      const data = await this.loadData();
      const stats = {};

      // Count by category
      data.updates.forEach(update => {
        const category = update.category || 'unknown';
        stats[category] = (stats[category] || 0) + 1;
      });

      return {
        total: data.updates.length,
        by_category: stats,
        last_updated: new Date()
      };
    } catch (error) {
      console.error('Erreur calcul stats:', error);
      return {
        total: 0,
        by_category: {},
        last_updated: new Date()
      };
    }
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async clearData() {
    try {
      const emptyData = {
        updates: [],
        lastUpdated: new Date(),
        version: '1.0'
      };
      
      await this.saveData(emptyData);
      return true;
    } catch (error) {
      console.error('Erreur suppression données:', error);
      return false;
    }
  }
}

export const storage = new JSONStorage();
