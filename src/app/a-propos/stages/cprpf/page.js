'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Clock, Building } from 'lucide-react';
import { FadeIn, ScaleIn } from '../../../../components/animations';

export default function StageCPRPFPage() {
  
  const stageInfo = {
    entreprise: 'CPRPF',
    logo: '/images/stages/logo-cprpf.svg',
    periodeDebut: 'À définir',
    periodeFin: 'À définir',
    duree: 'À définir',
    lieu: 'À définir',
    type: 'Stage professionnel BTS SIO SISR',
    secteur: 'Formation professionnelle et rééducation',
    description: 'Stage à venir au sein du CPRPF (Centre Provençal de Rééducation et de Préformation). Plus de détails seront disponibles prochainement une fois le stage commencé.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Bouton retour */}
        <FadeIn delay={0.1}>
          <Link 
            href="/a-propos/stages" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour aux stages</span>
          </Link>
        </FadeIn>

        {/* Header avec logo */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            
            {/* Banner avec logo */}
            <div className="relative h-64 bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
              <div className="relative w-72 h-48">
                <Image
                  src={stageInfo.logo}
                  alt={`Logo ${stageInfo.entreprise}`}
                  fill
                  className="object-contain p-6"
                  priority
                />
              </div>
            </div>

            {/* Informations principales */}
            <div className="p-8">
              
              {/* Badge "À venir" */}
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  🚀 Stage à venir
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Stage chez {stageInfo.entreprise}
              </h1>

              {/* Grille d'informations */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Période</p>
                    <p className="font-semibold text-gray-900">À définir</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                  <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Durée</p>
                    <p className="font-semibold text-gray-900">{stageInfo.duree}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Lieu</p>
                    <p className="font-semibold text-gray-900">{stageInfo.lieu}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <Building className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="font-semibold text-gray-900 text-sm">{stageInfo.type}</p>
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  À propos du CPRPF
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {stageInfo.description}
                </p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Message informatif */}
        <ScaleIn delay={0.4}>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-3">
              📝 Contenu à venir
            </h3>
            <p className="text-blue-50 max-w-2xl mx-auto">
              Cette page sera mise à jour avec les détails du stage, les missions réalisées, 
              les compétences acquises et des photos une fois le stage commencé.
            </p>
            <div className="mt-6">
              <Link 
                href="/a-propos/stages"
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Voir mes autres stages
              </Link>
            </div>
          </div>
        </ScaleIn>

      </div>
    </div>
  );
}
