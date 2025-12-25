'use client'

import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { 
  ArrowLeft, BookOpen, FileText, Download, 
  ZoomIn, ZoomOut, Eye, CheckCircle2, Building,
  Server, Network, Shield, Users
} from 'lucide-react'
import Link from 'next/link'
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, FloatingElement } from '../../../components/animations'

export default function ProjetsE5() {
  const [pdfUrl] = useState('/documents/Dossier_E5_IRATNI_Hocine_BTS_BLANC.pdf')
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-800/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-800/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-700/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <FadeIn delay={0.1} direction="left">
            <div className="mb-8">
              <Link 
                href="/projets" 
                className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors duration-200 bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux Projets
              </Link>
            </div>
          </FadeIn>

          <div className="text-center">
            {/* Badge E5 */}
            <FloatingElement delay={0.2} duration={3}>
              <ScaleIn delay={0.3} scale={0.5}>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-purple-500/30 rounded-full mb-8 shadow-lg shadow-purple-500/10">
                  <Building className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300 font-semibold">Épreuve E5 - Stage en Entreprise</span>
                </div>
              </ScaleIn>
            </FloatingElement>

            {/* Titre principal */}
            <FadeIn delay={0.4} direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                <span className="block mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  PROJETS PROFESSIONNELS
                </span>
                <span className="block text-white">
                  DOSSIER E5
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <SlideIn delay={0.6} direction="up" duration={0.7}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <FloatingElement duration={2.5}>
                      <div className="p-4 bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20">
                        <Building className="w-8 h-8 text-purple-400" />
                      </div>
                    </FloatingElement>
                    <div className="flex-1 text-left">
                      <h2 className="text-2xl font-bold text-white mb-4">À propos de ce dossier</h2>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Ce document présente mon expérience professionnelle au sein de <span className="text-purple-400 font-semibold">l'Association Sauvegarde13</span>, 
                        une structure à but non lucratif intervenant dans le domaine de la protection de l'enfance et de l'accompagnement social.
                      </p>
                      <p className="text-slate-300 leading-relaxed text-lg mt-4">
                        Durant mon stage, j'ai eu l'opportunité de concevoir et déployer un <span className="text-blue-400 font-semibold">serveur de déploiement de secours</span> basé 
                        sur WDS/MDT, garantissant la continuité du service de déploiement des postes informatiques en cas de panne du système principal.
                      </p>
                    </div>
                  </div>

                  {/* Entreprise Info */}
                  <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-600/40">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                          <Building className="w-5 h-5 text-purple-400" />
                          Association Sauvegarde13
                        </h3>
                        <div className="space-y-2 text-slate-300 text-sm">
                          <p><span className="text-purple-400 font-semibold">Secteur:</span> Social, médico-social et éducatif</p>
                          <p><span className="text-purple-400 font-semibold">Statut:</span> Association loi 1901 à but non lucratif</p>
                          <p><span className="text-purple-400 font-semibold">Localisation:</span> 4 Rue Gabriel Marie, 13010 Marseille</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          Missions réalisées
                        </h3>
                        <div className="space-y-2 text-slate-300 text-sm">
                          <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            Déploiement de postes informatiques
                          </p>
                          <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            Maintenance et gestion du parc informatique
                          </p>
                          <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            Installation d'infrastructure réseau (baie de brassage)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projet Principal */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex items-start gap-4">
                      <FloatingElement duration={3}>
                        <div className="p-3 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-500/30">
                          <Server className="w-7 h-7 text-purple-400" />
                        </div>
                      </FloatingElement>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-xl mb-3">Projet Principal</h3>
                        <h4 className="text-purple-300 font-semibold text-lg mb-3">
                          Mise en place d'un serveur de déploiement (Mastering) de secours avec WDS/MDT
                        </h4>
                        <p className="text-slate-300 text-sm mb-4">
                          Développement d'un prototype de serveur de déploiement de secours fiable et simple, 
                          basé sur Windows Deployment Services (WDS) et Microsoft Deployment Toolkit (MDT), 
                          pour assurer la continuité du service en cas de panne du système SCCM principal.
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                            <Server className="w-3 h-3 mr-1" />
                            WDS
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                            <Network className="w-3 h-3 mr-1" />
                            MDT
                          </Badge>
                          <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
                            <Shield className="w-3 h-3 mr-1" />
                            Windows Server
                          </Badge>
                          <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                            <Network className="w-3 h-3 mr-1" />
                            pfSense DHCP
                          </Badge>
                        </div>

                        {/* Résultats clés */}
                        <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-3 gap-3">
                          <StaggerItem>
                            <div className="flex items-center gap-2 text-green-300 bg-slate-700/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-600/40">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                              <span className="text-xs font-medium">Déploiement PXE fonctionnel</span>
                            </div>
                          </StaggerItem>
                          <StaggerItem>
                            <div className="flex items-center gap-2 text-green-300 bg-slate-700/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-600/40">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                              <span className="text-xs font-medium">Jonction automatique au domaine</span>
                            </div>
                          </StaggerItem>
                          <StaggerItem>
                            <div className="flex items-center gap-2 text-green-300 bg-slate-700/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-600/40">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                              <span className="text-xs font-medium">Installation automatisée</span>
                            </div>
                          </StaggerItem>
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Section PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FadeIn delay={0.3} direction="up">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-600/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Controls */}
            <div className="bg-slate-800/60 backdrop-blur-lg border-b border-slate-600/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FloatingElement duration={2.8}>
                    <Eye className="w-6 h-6 text-purple-400" />
                  </FloatingElement>
                  <span className="text-white font-bold text-lg">Visualisation du dossier E5</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm px-3 py-1">
                    PDF
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur-md rounded-xl p-2 border border-slate-600/40">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleZoomOut}
                      className="text-purple-300 hover:text-purple-200 hover:bg-slate-600/50 border-0"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </Button>
                    <span className="text-sm text-white font-semibold px-3 min-w-[60px] text-center">
                      {zoom}%
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleZoomIn}
                      className="text-purple-300 hover:text-purple-200 hover:bg-slate-600/50 border-0"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Download button */}
                  <Button
                    size="sm"
                    className="bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-md text-purple-300 border border-purple-500/30 font-semibold px-6 py-2"
                    onClick={() => window.open(pdfUrl, '_blank')}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="bg-slate-900/30 p-8 backdrop-blur-sm">
              <ScaleIn delay={0.4} duration={0.6}>
                <div 
                  className="mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30"
                  style={{ 
                    width: `${zoom}%`,
                    maxWidth: '100%',
                    transition: 'width 0.3s ease'
                  }}
                >
                  {/* PDF Viewer */}
                  <div className="aspect-[1/1.414]">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full border-0"
                      title="Dossier E5 - IRATNI Hocine - Sauvegarde13"
                    />
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </FadeIn>

        {/* Navigation au bas */}
        <FadeIn delay={0.5} direction="up">
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/projets">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour aux projets
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-slate-600 bg-slate-800/40 backdrop-blur-md text-white hover:bg-slate-700/60 font-bold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/projets/scolaires">
                <FileText className="w-5 h-5 mr-2" />
                Projets Scolaires E6
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
