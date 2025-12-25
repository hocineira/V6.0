'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Building, Calendar, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/animations';

export default function StagesIndexPage() {
  const stages = [
    {
      id: 'sauvegarde13',
      entreprise: 'Sauvegarde13',
      logo: '/images/stages/logo-sauvegarde13.svg',
      periode: 'Mars 2025 - Mai 2025',
      duree: '1 mois',
      lieu: 'Marseille, France',
      type: 'Stage d\'observation et pratique',
      secteur: 'Association d\'aide sociale',
      description: 'Stage en entreprise au sein de Sauvegarde13, association spécialisée dans l\'accompagnement de personnes en situation de handicap. Missions techniques en infrastructure réseau, maintenance informatique et support mobile.',
      couleur: 'from-blue-500 to-indigo-600',
      disponible: true
    },
    {
      id: 'cprpf',
      entreprise: 'CPRPF',
      logo: '/images/stages/logo-cprpf.svg',
      periode: 'À venir',
      duree: 'À définir',
      lieu: 'À définir',
      type: 'Stage professionnel',
      secteur: 'Formation professionnelle',
      description: 'Stage à venir au sein du CPRPF (Centre Provençal de Rééducation et de Préformation). Plus de détails seront disponibles prochainement.',
      couleur: 'from-orange-500 to-pink-600',
      disponible: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header avec retour */}
        <FadeIn delay={0.1}>
          <Link 
            href="/a-propos" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour à À propos</span>
          </Link>
        </FadeIn>

        {/* Titre principal */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
              <Building className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mes Stages
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez mon expérience professionnelle en entreprise
            </p>
          </div>
        </FadeIn>

        {/* Grille des stages */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {stages.map((stage, index) => (
            <StaggerItem key={stage.id} index={index}>
              <Link 
                href={stage.disponible ? `/a-propos/stages/${stage.id}` : '#'}
                className={`block group ${!stage.disponible ? 'cursor-not-allowed' : ''}`}
              >
                <div className={`
                  relative h-full bg-white rounded-2xl shadow-lg overflow-hidden
                  transition-all duration-300
                  ${stage.disponible 
                    ? 'hover:shadow-2xl hover:-translate-y-2' 
                    : 'opacity-75'
                  }
                `}>
                  
                  {/* Badge "À venir" */}
                  {!stage.disponible && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                        À venir
                      </span>
                    </div>
                  )}

                  {/* Header coloré avec logo/icône */}
                  <div className={`
                    relative h-48 bg-gradient-to-br ${stage.couleur}
                    flex items-center justify-center
                    ${stage.disponible ? 'group-hover:scale-105' : ''}
                    transition-transform duration-300
                  `}>
                    {stage.logo ? (
                      <div className="relative w-48 h-32">
                        <Image
                          src={stage.logo}
                          alt={`Logo ${stage.entreprise}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    ) : (
                      <Building className="w-20 h-20 text-white opacity-90" />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    
                    {/* Nom entreprise */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Stage chez {stage.entreprise}
                    </h2>

                    {/* Infos rapides */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">
                          <span className="font-medium">Période:</span> {stage.periode}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">
                          <span className="font-medium">Lieu:</span> {stage.lieu}
                        </span>
                      </div>
                    </div>

                    {/* Type de stage */}
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                      {stage.type}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {stage.description}
                    </p>

                    {/* Bouton CTA */}
                    {stage.disponible ? (
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-blue-600 font-medium group-hover:text-blue-700">
                          Voir les détails
                        </span>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-gray-100 text-center">
                        <span className="text-gray-400 text-sm">
                          Détails disponibles prochainement
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note bas de page */}
        <FadeIn delay={0.8}>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Ces stages font partie de ma formation BTS SIO SISR
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
