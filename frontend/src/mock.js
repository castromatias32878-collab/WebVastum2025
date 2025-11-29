// Mock data para VASTUM - Software ERP de Gestión de Residuos

export const mockData = {
  hero: {
    title: "VASTUM",
    subtitle: "Software ERP de Gestión de Residuos",
    tagline: "Mucho más que un Software de Gestión",
    question1: "¿Qué necesita tu empresa para crecer?",
    question2: "¿Para ser más rentable?",
    description: "La solución integral ERP para empresas de gestión de residuos. Optimiza operaciones, aumenta rentabilidad y escala tu negocio.",
    cta: "Solicitar Demo",
    ctaSecondary: "Conocer Soluciones",
    image: "https://images.unsplash.com/photo-1608425066267-dd6f4e0cf390",
    videoLabel: "VER DEMO"
  },

  stats: [
    { value: "500+", label: "Empresas Confiando" },
    { value: "15+", label: "Años de Experiencia" },
    { value: "50+", label: "Funcionalidades" },
    { value: "24/7", label: "Soporte Técnico" }
  ],

  clients: [
    { name: "Cliente 1", logo: "" },
    { name: "Cliente 2", logo: "" },
    { name: "Cliente 3", logo: "" },
    { name: "Cliente 4", logo: "" }
  ],

  features: [
    {
      id: 1,
      icon: "Truck",
      title: "Gestión de Flota",
      description: "Control total de tu flota de vehículos. Monitoreo en tiempo real, mantenimiento preventivo, consumo de combustible y rendimiento operativo.",
      image: "https://images.unsplash.com/photo-1574974671999-24b7dfbb0d53"
    },
    {
      id: 2,
      icon: "Users",
      title: "Gestión de Clientes",
      description: "Administra tu cartera de clientes, contratos, frecuencias de servicio y facturación recurrente. CRM integrado para fortalecer relaciones comerciales.",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9"
    },
    {
      id: 3,
      icon: "MapPin",
      title: "Optimización de Rutas",
      description: "Algoritmos inteligentes para planificar rutas eficientes. Reduce costos operativos, tiempo de recorrido y mejora la productividad de tu flota.",
      image: "https://images.unsplash.com/photo-1610307563697-137f8cafad37"
    },
    {
      id: 4,
      icon: "BarChart3",
      title: "Business Intelligence",
      description: "Dashboards personalizables con métricas clave del negocio. Analiza rentabilidad por cliente, servicio y ruta. Toma decisiones basadas en datos.",
      image: "https://images.unsplash.com/photo-1614201756100-1ccde6a6589e"
    },
    {
      id: 5,
      icon: "FileText",
      title: "Facturación Automatizada",
      description: "Genera facturas automáticas según frecuencia de servicio. Integración con sistemas contables. Facturación electrónica AFIP.",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9"
    },
    {
      id: 6,
      icon: "Recycle",
      title: "Trazabilidad de Residuos",
      description: "Seguimiento completo desde recolección hasta disposición final. Cumplimiento de normativas ambientales y generación de manifiestos.",
      image: "https://images.unsplash.com/photo-1614201756100-1ccde6a6589e"
    }
  ],

  solutions: [
    {
      id: 1,
      title: "ERP Básico",
      subtitle: "Para empresas en crecimiento",
      description: "Gestión de rutas, clientes y facturación básica",
      modules: [
        "Gestión de Clientes",
        "Planificación de Rutas",
        "Facturación Básica",
        "Reportes Operativos"
      ],
      cta: "Conocer más"
    },
    {
      id: 2,
      title: "ERP Profesional",
      subtitle: "Para empresas establecidas",
      description: "Solución completa con gestión de flota y BI",
      modules: [
        "Todo lo de Básico",
        "Gestión de Flota",
        "Business Intelligence",
        "Facturación Automática",
        "CRM Avanzado",
        "App Móvil"
      ],
      cta: "Solicitar Demo",
      featured: true
    },
    {
      id: 3,
      title: "ERP Enterprise",
      subtitle: "Para grandes operaciones",
      description: "Máxima personalización y escalabilidad",
      modules: [
        "Todo lo de Profesional",
        "Múltiples Sucursales",
        "Integraciones API",
        "Soporte Premium 24/7",
        "Capacitación Continua",
        "Consultoría Personalizada"
      ],
      cta: "Contactar Ventas"
    }
  ],

  benefits: [
    {
      id: 1,
      title: "Aumenta tu Rentabilidad",
      description: "Optimiza costos operativos hasta un 35% mediante rutas eficientes, mejor gestión de combustible y reducción de tiempos muertos. Mejora tus márgenes y rentabilidad por cliente.",
      icon: "TrendingUp"
    },
    {
      id: 2,
      title: "Escala tu Negocio",
      description: "Infraestructura preparada para crecer. Agrega nuevos clientes, vehículos y rutas sin complicaciones. Sistema multi-sucursal para expansión geográfica.",
      icon: "Zap"
    },
    {
      id: 3,
      title: "Toma Mejores Decisiones",
      description: "Información en tiempo real y reportes inteligentes. Identifica servicios más rentables, clientes estratégicos y oportunidades de mejora operativa.",
      icon: "Target"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Roberto Fernández",
      position: "Director Operaciones",
      company: "EcoGestión SRL",
      text: "VASTUM transformó nuestra operación. La optimización de rutas redujo nuestros costos de combustible en 30% y mejoramos la satisfacción de clientes.",
      avatar: ""
    },
    {
      id: 2,
      name: "María Rodríguez",
      position: "Gerente General",
      company: "Residuos Industriales SA",
      text: "El control de flota y la facturación automatizada nos permitió crecer sin contratar personal adicional. Ahora gestionamos el triple de clientes.",
      avatar: ""
    },
    {
      id: 3,
      name: "Carlos Gómez",
      position: "CEO",
      company: "Reciclaje del Norte",
      text: "La trazabilidad completa nos ayudó a cumplir con todas las normativas ambientales y ganar licitaciones importantes. Soporte técnico excelente.",
      avatar: ""
    }
  ],

  companyTypes: [
    "Empresa de Recolección",
    "Empresa de Reciclaje",
    "Centro de Acopio",
    "Planta de Tratamiento",
    "Gestor Ambiental",
    "Transportista de Residuos",
    "Consultoría Ambiental",
    "Otro"
  ],

  modules: [
    { name: "Gestión de Clientes y Contratos", icon: "Users" },
    { name: "Planificación de Rutas", icon: "MapPin" },
    { name: "Control de Flota", icon: "Truck" },
    { name: "Facturación Electrónica", icon: "FileText" },
    { name: "Business Intelligence", icon: "BarChart3" },
    { name: "Trazabilidad de Residuos", icon: "Recycle" },
    { name: "App Móvil para Operarios", icon: "Smartphone" },
    { name: "Gestión de Mantenimiento", icon: "Wrench" },
    { name: "Reportes Regulatorios", icon: "Shield" },
    { name: "CRM y Atención al Cliente", icon: "MessageCircle" },
    { name: "Gestión de Inventarios", icon: "Package" },
    { name: "Portal Web para Clientes", icon: "Globe" }
  ]
};
