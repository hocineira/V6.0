'use client'

import Link from 'next/link';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard } from '../../../components/animations';

export default function VeilleJuridique() {
  // Sections de navigation
  const sections = [
    { id: 'introduction', label: 'Introduction', icon: '➡️' },
    { id: 'principes', label: 'Principes RGPD', icon: '➡️' },
    { id: 'droits-obligations', label: 'Droits & Obligations', icon: '➡️' },
    { id: 'evolutions', label: 'Évolutions', icon: '➡️' },
    { id: 'historique', label: 'Historique', icon: '➡️' },
    { id: 'conformite', label: 'Conformité', icon: '➡️' },
    { id: 'ressources', label: 'Ressources', icon: '➡️' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Timeline historique RGPD
  const timeline = [
    {
      year: '1995',
      title: 'Directive européenne 95/46/CE',
      description: "Première directive européenne sur la protection des données personnelles. Elle établit les bases de la protection des données en Europe, mais reste non contraignante et nécessite une transposition nationale."
    },
    {
      year: '2012',
      title: 'Proposition du RGPD',
      description: "La Commission européenne propose un règlement pour remplacer la directive de 1995. L'objectif : harmoniser les règles de protection des données dans toute l'UE et les adapter à l'ère numérique."
    },
    {
      year: '2016',
      title: 'Adoption du RGPD',
      description: "Le 27 avril 2016, le Parlement européen adopte le Règlement Général sur la Protection des Données (RGPD). Il remplace la directive 95/46/CE et devient directement applicable dans tous les États membres."
    },
    {
      year: '2018',
      title: 'Entrée en vigueur',
      description: "Le 25 mai 2018, le RGPD entre officiellement en application dans toute l'Union européenne. Les entreprises doivent se mettre en conformité sous peine de sanctions financières importantes."
    },
    {
      year: '2020',
      title: 'Schrems II - Invalidation Privacy Shield',
      description: "La Cour de justice de l'UE invalide le Privacy Shield dans l'arrêt Schrems II. Les transferts de données vers les États-Unis sont remis en question, obligeant les entreprises à revoir leurs pratiques."
    },
    {
      year: '2023-2025',
      title: 'Maturité et renforcement',
      description: "Le RGPD atteint sa phase de maturité avec des sanctions record, une jurisprudence établie et de nouvelles obligations. Les autorités renforcent les contrôles, notamment sur l'IA et les cookies."
    }
  ];

  // Événements marquants
  const milestones = [
    {
      year: '2019',
      title: 'Première amende record (Google)',
      description: "Google écope d'une amende de 50 millions d'euros de la CNIL pour manque de transparence et consentement invalide concernant la publicité ciblée."
    },
    {
      year: '2021',
      title: 'Amazon sanctionné à 746M€',
      description: "Amazon reçoit la plus grosse amende RGPD jamais infligée (746 millions d'euros) par l'autorité luxembourgeoise pour utilisation abusive de données personnelles."
    },
    {
      year: '2022',
      title: 'Meta sanctionné à 1,2Mds€',
      description: "Meta (Facebook) reçoit une amende record de 1,2 milliard d'euros pour transferts illégaux de données vers les États-Unis après l'arrêt Schrems II."
    },
    {
      year: '2023',
      title: 'Renforcement sur les cookies',
      description: "Les autorités européennes durcissent leur position sur les cookie walls et le consentement. De nombreux sites web français sont sanctionnés pour pratiques non conformes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* ==================== HEADER SECTION ==================== */}
      <section className="relative overflow-hidden py-12 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4">
          <FadeIn delay={0.1}>
            <Link href="/veilles" className="inline-block mb-6">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour aux veilles</span>
              </button>
            </Link>
          </FadeIn>

          <div className="text-center text-white">
            <ScaleIn delay={0.2}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm text-4xl">
                  ⚖️
                </div>
              </div>
            </ScaleIn>

            <FadeIn delay={0.3} direction="up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Veille Juridique RGPD
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4} direction="up">
              <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Découvrez le Règlement Général sur la Protection des Données : principes, droits, obligations et évolutions pour garantir la conformité de votre organisation
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== NAVIGATION SECTIONS ==================== */}
      <section className="py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all duration-200 text-sm font-medium"
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION INTRODUCTION ==================== */}
      <section id="introduction" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Introduction au RGPD et à la protection des données
            </h2>
          </FadeIn>

          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0.3}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Qu'est-ce que le RGPD ?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Le Règlement Général sur la Protection des Données (RGPD) est un texte réglementaire européen entré en vigueur le 25 mai 2018. Il encadre le traitement des données personnelles sur le territoire de l'Union européenne et s'applique à toute organisation (entreprise, association, administration) qui collecte, traite ou stocke des données personnelles de résidents européens, qu'elle soit établie en Europe ou non.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Le RGPD vise à redonner aux citoyens européens le contrôle de leurs données personnelles, tout en simplifiant l'environnement réglementaire des entreprises en harmonisant les règles au niveau européen. Il remplace la directive 95/46/CE qui était obsolète face aux enjeux du numérique.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Pourquoi le RGPD est-il crucial pour les organisations ?</h4>
                  <ul className="space-y-2">
                    {[
                      { title: 'Protection renforcée', desc: 'Droits accrus des personnes sur leurs données (accès, rectification, effacement, portabilité)' },
                      { title: 'Responsabilisation', desc: 'Les entreprises doivent démontrer leur conformité (accountability) et documenter leurs traitements' },
                      { title: 'Sanctions dissuasives', desc: "Amendes pouvant atteindre 4% du chiffre d'affaires mondial ou 20 millions d'euros" },
                      { title: 'Confiance client', desc: 'La conformité RGPD est devenue un argument de différenciation et de confiance' },
                      { title: 'Harmonisation européenne', desc: 'Un seul règlement applicable dans les 27 pays de l\'UE, simplifiant les opérations transfrontalières' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span><strong className="text-slate-900">{item.title}</strong> : {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== SECTION PRINCIPES ==================== */}
      <section id="principes" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Les 7 principes fondamentaux du RGPD
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'Finalité',
                description: "Les données doivent être collectées pour des finalités déterminées, explicites et légitimes. On ne peut pas collecter des données 'au cas où' sans objectif précis."
              },
              {
                icon: '📊',
                title: 'Minimisation',
                description: "Seules les données strictement nécessaires à la finalité poursuivie doivent être collectées. Principe du 'moins c'est mieux' pour limiter les risques."
              },
              {
                icon: '✅',
                title: 'Exactitude',
                description: "Les données doivent être exactes et tenues à jour. Les données inexactes doivent être effacées ou rectifiées sans délai pour garantir leur fiabilité."
              },
              {
                icon: '⏱️',
                title: 'Conservation limitée',
                description: "Les données ne peuvent être conservées indéfiniment. Une durée de conservation doit être définie en fonction de la finalité du traitement."
              },
              {
                icon: '🔒',
                title: 'Sécurité et confidentialité',
                description: "Des mesures techniques et organisationnelles appropriées doivent être mises en place pour garantir la sécurité des données (chiffrement, contrôle d'accès, pseudonymisation)."
              },
              {
                icon: '📝',
                title: 'Licéité et transparence',
                description: "Le traitement doit reposer sur une base légale (consentement, contrat, intérêt légitime, etc.) et les personnes doivent être informées clairement de l'utilisation de leurs données."
              },
              {
                icon: '⚖️',
                title: 'Responsabilité (Accountability)',
                description: "Les responsables de traitement doivent être en mesure de démontrer leur conformité au RGPD via une documentation complète (registre, PIA, politiques de sécurité)."
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 h-full border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SECTION DROITS ET OBLIGATIONS ==================== */}
      <section id="droits-obligations" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Droits des personnes et obligations des organisations
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Droits des personnes */}
            <FadeIn delay={0.3} direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">👤</span>
                  Droits des personnes concernées
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: 'Droit d\'accès', desc: 'Obtenir une copie de ses données personnelles et des informations sur leur traitement' },
                    { title: 'Droit de rectification', desc: 'Faire corriger des données inexactes ou incomplètes' },
                    { title: 'Droit à l\'effacement ("droit à l\'oubli")', desc: 'Demander la suppression de ses données dans certaines conditions' },
                    { title: 'Droit à la limitation du traitement', desc: 'Demander le gel temporaire du traitement de ses données' },
                    { title: 'Droit à la portabilité', desc: 'Récupérer ses données dans un format structuré et les transférer à un autre responsable' },
                    { title: 'Droit d\'opposition', desc: 'S\'opposer au traitement de ses données pour des raisons tenant à sa situation particulière' },
                    { title: 'Droit de ne pas faire l\'objet d\'une décision automatisée', desc: 'Ne pas être soumis à une décision fondée exclusivement sur un traitement automatisé (profilage)' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-indigo-500 mr-2 font-bold">→</span>
                      <div>
                        <strong className="text-slate-900">{item.title}</strong>
                        <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Obligations des organisations */}
            <FadeIn delay={0.3} direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🏢</span>
                  Obligations des organisations
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: 'Tenir un registre des traitements', desc: 'Documenter tous les traitements de données personnelles (finalité, catégories de données, durées de conservation)' },
                    { title: 'Désigner un DPO (si applicable)', desc: 'Nommer un Délégué à la Protection des Données pour les autorités publiques et certaines entreprises' },
                    { title: 'Réaliser des analyses d\'impact (PIA)', desc: 'Effectuer une étude d\'impact sur la vie privée pour les traitements à risque élevé' },
                    { title: 'Notifier les violations de données', desc: 'Informer la CNIL sous 72h en cas de fuite de données et les personnes concernées si risque élevé' },
                    { title: 'Encadrer les sous-traitants', desc: 'S\'assurer que les prestataires traitant des données sont conformes au RGPD via des contrats' },
                    { title: 'Garantir la sécurité des données', desc: 'Mettre en place des mesures techniques et organisationnelles (chiffrement, contrôle d\'accès, audits)' },
                    { title: 'Privacy by Design & by Default', desc: 'Intégrer la protection des données dès la conception des projets et paramétrer par défaut le niveau le plus protecteur' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-500 mr-2 font-bold">•</span>
                      <div>
                        <strong className="text-slate-900">{item.title}</strong>
                        <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Acteurs clés */}
          <FadeIn delay={0.5}>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Les acteurs clés du RGPD</h3>
              <p className="text-indigo-100 mb-6">
                Le RGPD définit des rôles et responsabilités clairs pour chaque acteur impliqué dans le traitement des données personnelles.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '👔', title: 'Responsable de traitement', desc: 'Détermine les finalités et moyens du traitement (ex: l\'entreprise qui collecte les données)' },
                  { icon: '🔧', title: 'Sous-traitant', desc: 'Traite les données pour le compte du responsable (ex: hébergeur cloud, prestataire marketing)' },
                  { icon: '🛡️', title: 'DPO (Data Protection Officer)', desc: 'Conseille et contrôle la conformité RGPD au sein de l\'organisation' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-indigo-100">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==================== SECTION ÉVOLUTIONS ==================== */}
      <section id="evolutions" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Évolutions et versions du cadre réglementaire
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              De la directive européenne de 1995 au RGPD actuel, retour sur l'évolution de la protection des données en Europe et les textes complémentaires qui renforcent le dispositif.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: '📜',
                title: 'Directive 95/46/CE (1995-2018)',
                badge: 'Ancienne version',
                description: "Première harmonisation européenne de la protection des données, mais nécessitant une transposition nationale.",
                features: [
                  'Transposition nationale obligatoire',
                  'Règles non uniformes entre pays',
                  'Obsolète face au numérique',
                  'Remplacée par le RGPD en 2018'
                ]
              },
              {
                icon: '⚖️',
                title: 'RGPD (depuis 2018)',
                badge: 'Actuel',
                description: "Règlement européen directement applicable dans tous les États membres, uniformisant la protection des données.",
                features: [
                  'Application directe sans transposition',
                  'Amendes jusqu\'à 4% du CA mondial',
                  'Droits renforcés des personnes',
                  'Applicable aux données des résidents UE'
                ]
              },
              {
                icon: '🔌',
                title: 'ePrivacy (en cours)',
                badge: 'À venir',
                description: "Futur règlement complémentaire au RGPD, spécifique aux communications électroniques et cookies.",
                features: [
                  'Règles strictes sur les cookies',
                  'Confidentialité des communications',
                  'Consentement renforcé',
                  'Négociations en cours (sortie prévue)'
                ]
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 h-full border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">{item.badge}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, fidx) => (
                        <li key={fidx} className="text-sm text-slate-700 flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Textes complémentaires */}
          <FadeIn delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Textes et régulations complémentaires</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Texte</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Domaine</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { texte: 'Directive NIS 2', domaine: 'Cybersécurité des infrastructures critiques', statut: 'En vigueur (2023)' },
                      { texte: 'Digital Services Act (DSA)', domaine: 'Responsabilité des plateformes numériques', statut: 'En vigueur (2024)' },
                      { texte: 'Digital Markets Act (DMA)', domaine: 'Régulation des grandes plateformes (gatekeepers)', statut: 'En vigueur (2024)' },
                      { texte: 'AI Act', domaine: 'Encadrement de l\'intelligence artificielle', statut: 'Adopté (2024)' },
                      { texte: 'Data Governance Act', domaine: 'Partage et réutilisation des données', statut: 'En vigueur (2023)' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.texte}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{row.domaine}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{row.statut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==================== SECTION HISTORIQUE ==================== */}
      <section id="historique" className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Historique du RGPD et événements marquants
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              L'histoire du RGPD reflète l'évolution de la protection des données en Europe, depuis les premières directives jusqu'aux sanctions record et aux défis posés par les géants du numérique.
            </p>
          </FadeIn>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-600 hidden md:block"></div>
              
              <div className="space-y-8">
                {timeline.map((item, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx} direction="right">
                    <div className="relative flex gap-6 md:gap-8">
                      {/* Year badge */}
                      <div className="flex-shrink-0 w-16 md:w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                        {item.year}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.year} : {item.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones */}
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Sanctions et événements marquants
            </h3>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {milestones.map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-white rounded-xl p-6 h-full border border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-red-500 font-bold text-lg">⚠️</span>
                      <span className="text-indigo-600 font-bold">{item.year}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SECTION CONFORMITÉ ==================== */}
      <section id="conformite" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Conformité et bonnes pratiques RGPD
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-center mb-12 max-w-4xl mx-auto">
              La mise en conformité RGPD est un processus continu qui nécessite une approche méthodique. Voici les étapes clés et les bonnes pratiques à mettre en place pour garantir la protection des données personnelles.
            </p>
          </FadeIn>

          {/* Étapes de mise en conformité */}
          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: '📋',
                title: 'Cartographier les traitements',
                description: "Identifier tous les traitements de données personnelles via un registre détaillé. Documenter les finalités, bases légales, catégories de données, destinataires et durées de conservation pour chaque traitement."
              },
              {
                icon: '🔍',
                title: 'Analyser les risques',
                description: "Réaliser des analyses d'impact (PIA) pour les traitements à risque élevé. Évaluer les risques pour les droits et libertés des personnes et définir les mesures de sécurité proportionnées."
              },
              {
                icon: '🛡️',
                title: 'Sécuriser les données',
                description: "Mettre en place des mesures techniques (chiffrement, pseudonymisation, contrôle d'accès) et organisationnelles (politiques, formation, audits) pour garantir la sécurité des données."
              },
              {
                icon: '📚',
                title: 'Former et documenter',
                description: "Former les collaborateurs aux enjeux RGPD et bonnes pratiques. Documenter toutes les procédures (gestion des demandes d'exercice de droits, notification de violations, etc.)."
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-xl p-6 h-full border border-slate-200">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Risques et bonnes pratiques */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FadeIn delay={0.5} direction="left">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Risques de non-conformité</h3>
                <ul className="space-y-3">
                  {[
                    { title: 'Sanctions financières', desc: 'Amendes jusqu\'à 4% du CA mondial ou 20 millions d\'euros selon la violation' },
                    { title: 'Atteinte à la réputation', desc: 'Perte de confiance des clients et mauvaise publicité suite aux sanctions' },
                    { title: 'Actions en justice', desc: 'Class actions et plaintes collectives possibles depuis le RGPD' },
                    { title: 'Pertes opérationnelles', desc: 'Interruption d\'activité, obligation de mise en conformité urgente et coûteuse' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <div>
                        <strong className="text-slate-900">{item.title}</strong> : <span className="text-slate-600">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="right">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bonnes pratiques essentielles</h3>
                <ul className="space-y-2">
                  {[
                    'Désigner un DPO ou un référent protection des données',
                    'Tenir à jour le registre des traitements de données',
                    'Mettre en place une procédure de gestion des violations de données',
                    'Encadrer contractuellement les sous-traitants (clauses RGPD)',
                    'Recueillir un consentement libre, éclairé et granulaire',
                    'Faciliter l\'exercice des droits des personnes (portail dédié)',
                    'Réaliser des audits de conformité réguliers',
                    'Documenter toutes les actions de mise en conformité (accountability)',
                    'Former régulièrement les équipes aux évolutions du RGPD'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== SECTION RESSOURCES ==================== */}
      <section id="ressources" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Pour aller plus loin
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Approfondir vos connaissances RGPD implique de consulter la documentation officielle, de se former et de suivre l'actualité juridique en matière de protection des données.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Documentation */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  📚 Documentation officielle
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'CNIL - Guide du RGPD', url: 'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on' },
                    { label: 'Texte officiel du RGPD', url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679' },
                    { label: 'CEPD - Lignes directrices européennes', url: 'https://edpb.europa.eu/edpb_fr' },
                    { label: 'Guide de la sécurité des données', url: 'https://www.cnil.fr/fr/principes-cles/guide-de-la-securite-des-donnees-personnelles' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-2">
                        <span>•</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  🎓 Formations et certifications
                </h3>
                <ul className="space-y-3">
                  {[
                    { code: 'CNIL', name: 'MOOC RGPD de la CNIL (gratuit)', desc: 'Formation en ligne officielle pour comprendre le RGPD' },
                    { code: 'IAPP', name: 'Certified Information Privacy Professional (CIPP/E)', desc: 'Certification internationale reconnue' },
                    { code: 'AFCDP', name: 'Certificat DPO France', desc: 'Certification française de Délégué à la Protection des Données' }
                  ].map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <div>
                        <strong className="text-indigo-700">{cert.code}</strong> : {cert.name}
                        <p className="text-xs text-slate-500 mt-1">{cert.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Communautés */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Actualité et communautés</h3>
                <div className="space-y-4">
                  {[
                    { name: 'CNIL - Actualités', desc: 'Délibérations, sanctions et actualités officielles' },
                    { name: 'Village Justice', desc: 'Articles juridiques et analyses RGPD' },
                    { name: 'AFCDP', desc: 'Association française des DPO et professionnels' }
                  ].map((community, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900">{community.name}</h4>
                      <p className="text-sm text-slate-600">{community.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Besoin d'accompagnement RGPD ?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Questions sur la conformité RGPD, audit de vos pratiques ou mise en place de processus de protection des données ? Discutons-en ensemble.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = 'mailto:hocineira@gmail.com'}
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Me contacter</span>
              </button>
              <Link href="/veilles">
                <button className="border border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>Retour aux veilles</span>
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
