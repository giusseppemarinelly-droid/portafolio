import type { Locale, TimelineEntry } from './types'

export const profile = {
  name: 'Giusseppe Marinelly',
  initials: 'GM',
  email: 'giusseppemarinelly@gmail.com',
  /** Formato local venezolano, tal cual se lee. */
  phoneDisplay: '0412 199 0001',
  /** Formato internacional, para los enlaces `tel:`. */
  phoneIntl: '+584121990001',
  /** El mismo número, separado para leerlo de un vistazo. */
  phoneIntlDisplay: '+58 412 199 0001',
  whatsapp: 'https://wa.me/584121990001',
  location: { es: 'Carabobo, Venezuela', en: 'Carabobo, Venezuela' },
}

/** Inicio como desarrollador Full Stack en Sura de Venezuela. */
const WORK_START = { es: 'Mayo 2026', en: 'May 2026' }
const PRESENT = { es: 'Actualidad', en: 'Present' }

export const timeline: TimelineEntry[] = [
  {
    id: 'sura',
    period: { es: `${WORK_START.es} — ${PRESENT.es}`, en: `${WORK_START.en} — ${PRESENT.en}` },
    tags: ['Node.js', 'Python', 'PostgreSQL', 'React Native', 'Docker'],
    copy: {
      es: {
        title: 'Desarrollador Full Stack',
        place: 'Sura de Venezuela, C.A.',
        detail:
          'Desarrollo y mantengo sistemas internos de la empresa: el inventario multi-sede, el control de pesaje de la planta y el control de vehículos, además de colaborar en la intranet corporativa. Cubro el ciclo completo — modelado de la base de datos, API, cliente móvil o web, despliegue y operación en servidor propio.',
      },
      en: {
        title: 'Full Stack Developer',
        place: 'Sura de Venezuela, C.A.',
        detail:
          'I build and maintain internal company systems: multi-site inventory, plant weighing control and vehicle management, and I contribute to the corporate intranet. I cover the whole cycle — database modelling, API, mobile or web client, deployment and day-to-day operation on self-hosted infrastructure.',
      },
    },
  },
  {
    id: 'ujap',
    period: { es: `2023 — ${PRESENT.es}`, en: `2023 — ${PRESENT.en}` },
    tags: ['Algoritmos', 'Bases de datos', 'Redes', 'IA'],
    copy: {
      es: {
        title: 'Ingeniería en Computación',
        place: 'Universidad José Antonio Páez · San Diego, Carabobo',
        detail:
          'Formación en curso. La carrera aporta la base formal — estructuras de datos, bases de datos, redes y arquitectura — y el trabajo diario la pone a prueba contra sistemas reales en producción. De ahí salen también proyectos propios: la aplicación Epa para la comunidad UJAP y un agente de IA con patrón ReAct que corre de forma local.',
      },
      en: {
        title: 'Computer Engineering',
        place: 'Universidad José Antonio Páez · San Diego, Carabobo',
        detail:
          'Currently enrolled. The degree provides the formal foundation — data structures, databases, networking and architecture — while daily work tests it against real production systems. It is also where two of these projects come from: the Epa app for the UJAP community, and a locally-run ReAct-pattern AI agent.',
      },
    },
  },
]

interface Nav {
  about: string
  stack: string
  work: string
  path: string
  contact: string
}

export interface Copy {
  nav: Nav
  meta: {
    role: string
    availability: string
  }
  hero: {
    titleTop: string
    titleBottom: string
    lede: string
    ctaWork: string
    ctaContact: string
    scroll: string
  }
  about: {
    label: string
    heading: string
    body: string[]
    metrics: { value: string; label: string }[]
    /** Ficha de datos que acompaña al texto, en lugar del retrato. */
    facts: { label: string; value: string }[]
  }
  stack: {
    label: string
    heading: string
    lede: string
    coreNote: string
  }
  work: {
    label: string
    heading: string
    lede: string
    open: string
    close: string
    status: Record<'production' | 'active' | 'academic', string>
    filterAll: string
    /** Textos propios de la ficha completa del proyecto, que es una página aparte. */
    detail: {
      back: string
      next: string
      caseStudy: string
      year: string
      repo: string
    }
    sections: {
      challenge: string
      solution: string
      impact: string
      stack: string
      arch: string
      role: string
    }
    visit: string
    privateNote: string
    /** Nombre de cada capa en el diagrama de arquitectura. */
    layers: { client: string; service: string; data: string; hardware: string; external: string }
  }
  path: {
    label: string
    heading: string
    lede: string
  }
  contact: {
    label: string
    heading: string
    lede: string
    emailLabel: string
    whatsappLabel: string
    phoneLabel: string
    copy: string
    copied: string
  }
  footer: {
    rights: string
  }
  a11y: {
    toggleTheme: string
    toggleLang: string
    menu: string
  }
}

const es: Copy = {
  nav: { about: 'Sobre mí', stack: 'Stack', work: 'Proyectos', path: 'Trayectoria', contact: 'Contacto' },
  meta: {
    role: 'Desarrollador Full Stack',
    availability: 'Disponible para proyectos',
  },
  hero: {
    titleTop: 'Desarrollo soluciones',
    titleBottom: 'de software completas.',
    lede: 'Desarrollador Full Stack y estudiante de Ingeniería en Computación. Construyo aplicaciones de principio a fin: la arquitectura del servidor, el modelo de datos y la interfaz, tanto en web como en móvil.',
    ctaWork: 'Ver proyectos',
    ctaContact: 'Hablemos',
    scroll: 'Desliza',
  },
  about: {
    label: 'Sobre mí',
    heading: 'Un desarrollador que además levanta el servidor.',
    body: [
      'Soy Giusseppe Marinelly, desarrollador Full Stack y estudiante de Ingeniería en Computación. Me especializo en construir soluciones de software completas: domino tanto la arquitectura del lado del servidor como la creación de interfaces dinámicas y multiplataforma.',
      'Diseño aplicaciones enteras — desde el modelado de bases de datos relacionales en PostgreSQL y el despliegue de entornos en Docker, hasta APIs robustas con Node.js, Express o FastAPI, y el frontend con React, React Native y Vue.',
      'Me apasiona entender la lógica detrás de cada negocio para transformarla en código eficiente. Ya sea un sistema de gestión de inventarios o la automatización de una operación logística, el objetivo es el mismo: productos escalables, rápidos y con una experiencia impecable para quien los usa.',
    ],
    metrics: [
      { value: '6', label: 'proyectos completos' },
      { value: '3', label: 'en producción real' },
      { value: '2', label: 'apps móviles distribuidas' },
      { value: '5', label: 'lenguajes en uso diario' },
    ],
    facts: [
      { label: 'Rol', value: 'Desarrollador Full Stack' },
      { label: 'Empresa', value: 'Sura de Venezuela, C.A.' },
      { label: 'Formación', value: 'Ing. en Computación · UJAP' },
      { label: 'Base', value: 'Carabobo, Venezuela' },
      { label: 'Idiomas', value: 'Español · Inglés técnico' },
      { label: 'Enfoque', value: 'Backend, móvil e infraestructura' },
    ],
  },
  stack: {
    label: 'Herramientas',
    heading: 'El stack, ordenado por dónde vive cada pieza.',
    lede: 'No es una pared de logotipos: es lo que tengo abierto de verdad mientras trabajo.',
    coreNote: 'Resaltado: uso diario',
  },
  work: {
    label: 'Proyectos',
    heading: 'Lo que he construido, y qué problema resolvía.',
    lede: 'Seis proyectos, entre sistemas internos de empresa y trabajos de la carrera. Cada ficha cuenta cómo se hacía antes, la arquitectura que elegí y qué quedó funcionando.',
    open: 'Abrir ficha',
    close: 'Cerrar',
    status: { production: 'En producción', active: 'En desarrollo', academic: 'Universitario' },
    filterAll: 'Todos',
    detail: {
      back: 'Volver a proyectos',
      next: 'Siguiente proyecto',
      caseStudy: 'Caso de estudio',
      year: 'Año',
      repo: 'Repositorio',
    },
    sections: {
      challenge: 'El reto',
      solution: 'Qué construí',
      impact: 'Resultado',
      stack: 'Tecnologías',
      arch: 'Arquitectura',
      role: 'Mi rol',
    },
    visit: 'Visitar el sitio',
    privateNote: 'Repositorio privado.',
    layers: {
      client: 'Cliente',
      service: 'Servicio',
      data: 'Datos',
      hardware: 'Hardware',
      external: 'Externos',
    },
  },
  path: {
    label: 'Trayectoria',
    heading: 'El trabajo y la carrera, a la vez.',
    lede: 'La universidad da la base formal; los sistemas en planta la ponen a prueba.',
  },
  contact: {
    label: 'Contacto',
    heading: 'Cuéntame qué hay que construir.',
    lede: 'Escríbeme por correo o por WhatsApp. Contesto yo, no un formulario.',
    emailLabel: 'Correo',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Teléfono',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
  },
  a11y: {
    toggleTheme: 'Cambiar tema',
    toggleLang: 'Cambiar idioma',
    menu: 'Menú',
  },
}

const en: Copy = {
  nav: { about: 'About', stack: 'Stack', work: 'Work', path: 'Path', contact: 'Contact' },
  meta: {
    role: 'Full Stack Developer',
    availability: 'Available for projects',
  },
  hero: {
    titleTop: 'I develop complete',
    titleBottom: 'software solutions.',
    lede: 'Full Stack developer and Computer Engineering student. I build applications end to end: server architecture, data model and interface, across both web and mobile.',
    ctaWork: 'See the work',
    ctaContact: 'Get in touch',
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    heading: 'A developer who also brings the server up.',
    body: [
      'I’m Giusseppe Marinelly, a Full Stack developer and Computer Engineering student. I specialise in building complete software solutions, working equally on server-side architecture and on dynamic, cross-platform interfaces.',
      'I design whole applications — from relational database modelling in PostgreSQL and containerised environments in Docker, to robust APIs with Node.js, Express or FastAPI, and frontends in React, React Native and Vue.',
      'What drives me is understanding the logic behind a business and turning it into efficient code. Whether it’s an inventory management system or automating a logistics operation, the goal is the same: products that scale, respond fast, and feel right to the people using them.',
    ],
    metrics: [
      { value: '6', label: 'complete projects' },
      { value: '3', label: 'live in production' },
      { value: '2', label: 'mobile apps shipped' },
      { value: '5', label: 'languages in daily use' },
    ],
    facts: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'Company', value: 'Sura de Venezuela, C.A.' },
      { label: 'Studying', value: 'Computer Engineering · UJAP' },
      { label: 'Based in', value: 'Carabobo, Venezuela' },
      { label: 'Languages', value: 'Spanish · Technical English' },
      { label: 'Focus', value: 'Backend, mobile and infrastructure' },
    ],
  },
  stack: {
    label: 'Toolkit',
    heading: 'The stack, grouped by where each piece lives.',
    lede: 'Not a wall of logos — this is what I actually have open while I work.',
    coreNote: 'Highlighted: daily use',
  },
  work: {
    label: 'Selected work',
    heading: 'What I have built, and what it fixed.',
    lede: 'Six projects, between internal company systems and coursework. Each case tells how it was done before, the architecture I chose, and what ended up running.',
    open: 'Open case',
    close: 'Close',
    status: { production: 'In production', active: 'In development', academic: 'University' },
    filterAll: 'All',
    detail: {
      back: 'Back to work',
      next: 'Next project',
      caseStudy: 'Case study',
      year: 'Year',
      repo: 'Repository',
    },
    sections: {
      challenge: 'The challenge',
      solution: 'What I built',
      impact: 'Outcome',
      stack: 'Technologies',
      arch: 'Architecture',
      role: 'My role',
    },
    visit: 'Visit the site',
    privateNote: 'Private repository.',
    layers: {
      client: 'Client',
      service: 'Service',
      data: 'Data',
      hardware: 'Hardware',
      external: 'External',
    },
  },
  path: {
    label: 'Path',
    heading: 'The job and the degree, at once.',
    lede: 'University gives the formal base; systems on the plant floor put it to the test.',
  },
  contact: {
    label: 'Contact',
    heading: 'Tell me what needs building.',
    lede: 'Write to me by email or WhatsApp. You get me, not a contact form.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Phone',
    copy: 'Copy',
    copied: 'Copied',
  },
  footer: {
    rights: 'All rights reserved.',
  },
  a11y: {
    toggleTheme: 'Toggle theme',
    toggleLang: 'Switch language',
    menu: 'Menu',
  },
}

export const copy: Record<Locale, Copy> = { es, en }
