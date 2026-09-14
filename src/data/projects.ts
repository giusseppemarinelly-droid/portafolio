import type { Project } from './types'

/**
 * Cada proyecto es una ficha de caso, no una captura de pantalla: el reto real,
 * lo que se construyó y qué quedó funcionando. Los diagramas (`arch`) reflejan
 * la arquitectura verdadera de cada sistema.
 */
export const projects: Project[] = [
  {
    id: 'inventario',
    no: '01',
    year: '2026',
    status: 'production',
    stack: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'React Native',
      'Expo',
      'Docker',
      'Coolify',
      'JWT',
      'Claude API',
      'Traefik',
    ],
    arch: [
      { label: 'App Android (APK)', kind: 'client' },
      { label: 'Web / PWA', kind: 'client' },
      { label: 'API Express', kind: 'service', via: 'HTTPS · JWT' },
      { label: 'PostgreSQL 17', kind: 'data', via: 'pg Pool' },
      { label: 'Claude API', kind: 'external', via: 'visión · chat' },
      { label: 'Expo Push · SMTP', kind: 'external', via: 'alertas' },
    ],
    logo: '/projects/inventario.png',
    copy: {
      es: {
        title: 'Sistema de Gestión de Inventario y Logística',
        context: 'Sura de Venezuela, C.A. · Sistema interno',
        summary:
          'Mini-ERP / WMS multi-sede que gobierna el inventario de todos los almacenes, con app Android, web y una capa de inteligencia artificial encima.',
        challenge:
          'El inventario vivía en hojas de cálculo repartidas entre sedes: nadie veía el stock de otro almacén, los quiebres se detectaban tarde y las salidas a eventos volvían sin conciliar.',
        solution: [
          'API REST en Node.js + Express sobre PostgreSQL, con autenticación JWT y cuatro roles reales: administrador, encargado de sede, usuario y repartidor.',
          'Un solo cliente en React Native + Expo que se compila a la vez como APK de Android y como export web estático, sin duplicar código.',
          'Arquitectura multi-sucursal («casas»): cada almacén maneja su inventario de forma independiente, con equivalencias entre cajas y unidades sueltas.',
          'Módulo de eventos: despacho temporal con checklist de salida y conciliación automática de las devoluciones al regreso.',
          'Capa de IA con la API de Claude: chatbot administrativo, lectura de facturas por visión y análisis de rotación de producto.',
          'Alertas reactivas por notificación push (Expo) y correo electrónico cuando un producto baja del umbral de stock.',
          'Migración completa de infraestructura: de Vercel + Render + Supabase a un VPS propio gestionado con Coolify, con Postgres en contenedor, dominio propio y SSL de Let’s Encrypt.',
          'Distribución sin tiendas de aplicaciones: APK directo más actualizaciones OTA de solo-JS con EAS Update.',
        ],
        impact: [
          'En uso diario como sistema de inventario de la empresa.',
          'Tres servicios en la nube (web, API y base de datos) unificados en un único despliegue Docker sobre servidor propio.',
          'Migración de datos e imágenes de producto completada sin interrupción del servicio.',
          'Los usuarios reciben mejoras por OTA sin volver a instalar la aplicación.',
        ],
        role: 'Diseño de base de datos, API, app móvil, IA e infraestructura.',
      },
      en: {
        title: 'Inventory & Logistics Management System',
        context: 'Sura de Venezuela, C.A. · Internal system',
        summary:
          'A multi-site mini-ERP / WMS that runs inventory across every warehouse, with an Android app, a web client and an AI layer on top.',
        challenge:
          'Inventory lived in spreadsheets scattered across sites: nobody could see another warehouse’s stock, shortages were caught too late, and goods sent out to events came back unreconciled.',
        solution: [
          'REST API in Node.js + Express over PostgreSQL, with JWT auth and four real roles: admin, site manager, user and delivery driver.',
          'A single React Native + Expo client that builds both as an Android APK and as a static web export, with no duplicated code.',
          'Multi-branch architecture: each warehouse runs its own inventory, with box-to-unit equivalences handled by the domain layer.',
          'Events module: temporary dispatch with an outbound checklist and automatic reconciliation of returns.',
          'AI layer on the Claude API: admin chatbot, invoice reading through vision, and product rotation analysis.',
          'Reactive alerts via push notification (Expo) and email whenever a product drops below its stock threshold.',
          'Full infrastructure migration: from Vercel + Render + Supabase to a self-hosted VPS managed with Coolify — containerised Postgres, own domain and Let’s Encrypt SSL.',
          'App-store-free distribution: direct APK plus JS-only OTA updates through EAS Update.',
        ],
        impact: [
          'In daily use as the company’s inventory system.',
          'Three cloud services (web, API, database) collapsed into a single Docker deployment on owned hardware.',
          'Data and product-image migration completed with no service interruption.',
          'Users receive improvements over the air, without reinstalling the app.',
        ],
        role: 'Database design, API, mobile app, AI and infrastructure.',
      },
    },
  },

  {
    id: 'romana',
    no: '02',
    year: '2026',
    status: 'active',
    link: { href: 'https://github.com/giusseppemarinelly-droid/Romana', label: 'GitHub' },
    stack: [
      'Python',
      'FastAPI',
      'WebSocket',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'CustomTkinter',
      'PySerial',
      'ReportLab',
      'openpyxl',
    ],
    arch: [
      { label: 'Estación Romana', kind: 'client' },
      { label: 'Centro de Costos', kind: 'client' },
      { label: 'Backend FastAPI', kind: 'service', via: 'HTTP + WS' },
      { label: 'PostgreSQL', kind: 'data', via: 'SQLAlchemy' },
      { label: 'Báscula Toledo', kind: 'hardware', via: 'RS-232' },
    ],
    logo: '/projects/romana.svg',
    copy: {
      es: {
        title: 'Romana Digital — Control de pesaje de camiones',
        context: 'Sura de Venezuela, C.A. · Planta Guacara · Sistema interno',
        summary:
          'Software de escritorio cliente-servidor que cubre el ciclo completo de pesaje de un camión, desde que entra a la planta hasta que se factura, pensado para sustituir al software comercial que se usa hoy.',
        challenge:
          'La planta depende de un software comercial rígido (Bigsoft) que no permite adaptar el flujo real: tres pesajes, aprobación digital por Centro de Costos y trazabilidad de quién autorizó cada salida.',
        solution: [
          'Backend FastAPI con HTTP y WebSocket como única autoridad de datos y permisos; ninguna interfaz toca la base de datos directamente.',
          'Dos aplicaciones de escritorio independientes, instaladas en máquinas físicas distintas de la red de planta: Romana (báscula) y Centro de Costos (aprobaciones).',
          'Máquina de estados explícita de la pesada — en planta → pendiente de aprobación → aprobado/rechazado → completado — donde lo completado es inmutable y ni siquiera puede anularse.',
          'Lectura del indicador de peso Toledo por puerto serie, aislada tras una interfaz de estrategia para poder cambiar de marca de báscula sin tocar el resto del sistema, más un simulador para desarrollar sin hardware.',
          'Índice único parcial en PostgreSQL que garantiza que un vehículo no tenga dos pesadas activas a la vez, cerrando la condición de carrera a nivel de motor y no solo de código.',
          'Permisos por nivel de usuario definidos en un único lugar y aplicados por el servidor; la interfaz solo decide qué mostrar.',
          'Emisión de tickets en PDF y kardex exportable a Excel, con migraciones de esquema versionadas con Alembic.',
          'Carga de pantallas siempre en segundo plano: la ventana se dibuja al instante y los datos llegan después, para que un hipo de la red de planta no congele la aplicación.',
        ],
        impact: [
          'Flujo de pesaje modelado tal y como funciona la planta, no como lo impone un producto cerrado.',
          'Aprobación digital trazable: cada pesada guarda quién aprobó y cuándo.',
          'Actualización en vivo entre estaciones por WebSocket, con reconexión automática y resincronización por HTTP.',
        ],
        role: 'Arquitectura, backend, interfaces e integración con hardware.',
      },
      en: {
        title: 'Romana Digital — Truck Weighing Control',
        context: 'Sura de Venezuela, C.A. · Guacara plant · Internal system',
        summary:
          'Client-server desktop software covering a truck’s full weighing cycle, from gate-in to invoicing, built to replace the commercial software currently in use.',
        challenge:
          'The plant depends on rigid commercial software (Bigsoft) that cannot model the real workflow: three weighings, digital approval by Cost Control, and traceability of who authorised each exit.',
        solution: [
          'FastAPI backend over HTTP and WebSocket as the single authority for data and permissions — no UI ever touches the database directly.',
          'Two independent desktop applications installed on separate physical machines of the plant network: Weighbridge and Cost Control.',
          'An explicit state machine for each weighing — on site → pending approval → approved/rejected → completed — where a completed record is immutable and cannot even be voided.',
          'Toledo weight indicator read over the serial port, isolated behind a strategy interface so the scale brand can change without touching the rest of the system, plus a simulator for hardware-free development.',
          'A partial unique index in PostgreSQL guaranteeing a vehicle never has two active weighings, closing the race condition at the engine level rather than in application code.',
          'Per-level user permissions declared in one place and enforced by the server; the UI only decides what to display.',
          'PDF ticket printing and Excel-exportable ledger, with schema migrations versioned through Alembic.',
          'Screen data always loaded off the main thread: the window draws instantly and the data arrives after, so a hiccup on the plant network never freezes the application.',
        ],
        impact: [
          'The weighing flow modelled the way the plant actually works, not the way a closed product dictates.',
          'Traceable digital approval: every weighing records who approved it and when.',
          'Live updates between stations over WebSocket, with automatic reconnection and HTTP resynchronisation.',
        ],
        role: 'Architecture, backend, interfaces and hardware integration.',
      },
    },
  },

  {
    id: 'vehiculos',
    no: '03',
    year: '2026',
    status: 'production',
    stack: [
      'Express',
      'PostgreSQL',
      'React Native',
      'Expo',
      'Docker',
      'node-cron',
      'Claude API',
      'Expo Push',
    ],
    arch: [
      { label: 'App móvil + Web', kind: 'client' },
      { label: 'API Express', kind: 'service', via: 'JWT' },
      { label: 'PostgreSQL', kind: 'data', via: 'auto-bootstrap' },
      { label: 'Recordatorios', kind: 'external', via: 'cron · push' },
    ],
    logo: '/projects/vehiculos.png',
    copy: {
      es: {
        title: 'Control de Vehículos y Mantenimiento',
        context: 'Sura de Venezuela, C.A. · Sistema interno',
        summary:
          'Aplicación para llevar el mantenimiento, los documentos legales y los gastos de cualquier vehículo — auto, moto, bicicleta o lancha — con avisos antes de que algo se venza.',
        challenge:
          'El mantenimiento y los papeles de cada vehículo se olvidan hasta que ya vencieron. Hacía falta que el sistema avisara antes, no después.',
        solution: [
          'Modelo de dominio propio: vehículos, planes de servicio recurrentes, mantenimientos con foto de factura, documentos legales y gastos.',
          'Cálculo automático del estado de cada documento y servicio — al día, próximo a vencer o vencido — como regla de negocio del backend, no del cliente.',
          'Tareas programadas con node-cron que disparan notificaciones push por Expo antes del vencimiento.',
          'Esquema de base de datos que se crea y se actualiza solo al arrancar, de forma idempotente, para poder desplegar en un servidor nuevo sin pasos manuales.',
          'Cliente React Native + Expo con cinco pantallas sobre un sistema de diseño propio, distribuido como APK en Android y como PWA en iOS.',
          'Lectura de facturas de taller por visión con la API de Claude, aislada de modo que si la clave no está el resto del sistema sigue funcionando.',
        ],
        impact: [
          'En producción, sobre una arquitectura ya probada en el sistema de inventario.',
          'Despliegue en servidor nuevo sin pasos manuales de base de datos.',
          'Las funciones de IA degradan con elegancia: nunca tumban la aplicación.',
        ],
        role: 'Backend, base de datos, app móvil y diseño de producto.',
      },
      en: {
        title: 'Vehicle & Maintenance Control',
        context: 'Sura de Venezuela, C.A. · Internal system',
        summary:
          'An app for tracking maintenance, legal paperwork and expenses for any vehicle — car, motorbike, bicycle or boat — with reminders before anything expires.',
        challenge:
          'Vehicle servicing and paperwork get forgotten until they have already lapsed. The system needed to warn beforehand, not after.',
        solution: [
          'Purpose-built domain model: vehicles, recurring service plans, maintenance records with invoice photos, legal documents and expenses.',
          'Automatic status calculation for every document and service — current, due soon, expired — as a backend business rule rather than client logic.',
          'Scheduled jobs with node-cron firing Expo push notifications ahead of each expiry.',
          'A database schema that creates and migrates itself idempotently at boot, so a fresh server needs no manual steps.',
          'React Native + Expo client with five screens on a bespoke design system, shipped as an Android APK and an iOS PWA.',
          'Workshop-invoice reading through Claude vision, isolated so that a missing API key never takes the rest of the system down.',
        ],
        impact: [
          'In production, on an architecture already proven by the inventory system.',
          'Deploys to a new server with no manual database steps.',
          'AI features degrade gracefully — they never bring the app down.',
        ],
        role: 'Backend, database, mobile app and product design.',
      },
    },
  },

  {
    id: 'centro-sura',
    no: '04',
    year: '2025 — 2026',
    status: 'production',
    stack: ['React 18', 'Python', 'Flask', 'PostgreSQL 17', 'Celery', 'Docker Compose', 'Nginx'],
    arch: [
      { label: 'Web · Escritorio · Móvil', kind: 'client' },
      { label: 'Nginx', kind: 'service', via: 'proxy inverso' },
      { label: 'API Flask', kind: 'service', via: 'REST' },
      { label: 'PostgreSQL 17', kind: 'data', via: 'SQLAlchemy' },
      { label: 'Celery', kind: 'external', via: 'tareas programadas' },
    ],
    copy: {
      es: {
        title: 'Centro SURA — Intranet corporativa',
        context: 'Sura de Venezuela, C.A. · Colaboración en equipo',
        summary:
          'Plataforma interna multiplataforma que concentra organigrama, documentos, mapas, tableros y comunicación de la empresa. No es un proyecto mío: colaboro en él dentro del equipo.',
        challenge:
          'Es un sistema grande y ya en marcha. El reto de entrar a colaborar no es diseñarlo desde cero, sino leer código ajeno, respetar sus convenciones y aportar sin romper lo que ya funciona para toda la empresa.',
        solution: [
          'Colaboración sobre un stack Flask + PostgreSQL 17 en el backend y React 18 en el frontend, siguiendo las convenciones que ya tenía el proyecto.',
          'Trabajo dentro de una orquestación con Docker Compose en dos perfiles separados: desarrollo con recarga en caliente y producción con build estático servido por Nginx.',
          'Manejo de migraciones versionadas de base de datos y de tareas programadas en Celery, con PostgreSQL fijado a una versión exacta de imagen para evitar incompatibilidades al actualizar el servidor.',
          'Despliegue en servidor propio de la red corporativa, con certificado y proxy inverso.',
        ],
        impact: [
          'Experiencia trabajando sobre una base de código ajena y ya en producción.',
          'Práctica real de entornos separados de desarrollo y producción con contenedores.',
          'Aporte a un sistema que usa toda la empresa, sin ser su autor.',
        ],
        role: 'Colaborador dentro del equipo de desarrollo.',
      },
      en: {
        title: 'Centro SURA — Corporate Intranet',
        context: 'Sura de Venezuela, C.A. · Team collaboration',
        summary:
          'A cross-platform internal system bringing the org chart, documents, maps, dashboards and company communication together. Not my project: I contribute to it as part of the team.',
        challenge:
          'It is a large system already in flight. Joining it is not about designing from scratch but about reading someone else’s code, respecting its conventions, and contributing without breaking what the whole company depends on.',
        solution: [
          'Contributing to a Flask + PostgreSQL 17 backend and a React 18 frontend, following the conventions the project already had.',
          'Working inside a Docker Compose orchestration with two distinct profiles: development with hot reload, production with a static build served by Nginx.',
          'Handling versioned database migrations and Celery scheduled jobs, with PostgreSQL pinned to an exact image version to avoid incompatibilities during server upgrades.',
          'Deployed on a corporate-network server with its own certificate and reverse proxy.',
        ],
        impact: [
          'Experience working on an existing, production-critical codebase written by others.',
          'Real practice with containerised, cleanly separated dev and production environments.',
          'A contribution to a system the whole company uses, without being its author.',
        ],
        role: 'Contributor within the development team.',
      },
    },
  },

  {
    id: 'epa',
    no: '05',
    year: '2026',
    status: 'academic',
    link: { href: 'https://github.com/giusseppemarinelly-droid/epa-ujap', label: 'GitHub' },
    stack: [
      'React Native',
      'Expo Router',
      'TypeScript',
      'NativeWind',
      'Tailwind CSS',
      'Zustand',
      'Vue 3',
      'Prisma',
      'PostgreSQL',
    ],
    arch: [
      { label: 'App Expo Router', kind: 'client' },
      { label: 'Cliente web Vue 3', kind: 'client' },
      { label: 'API + Prisma', kind: 'service', via: 'REST' },
      { label: 'PostgreSQL', kind: 'data', via: 'esquema tipado' },
      { label: 'Mapas', kind: 'external', via: 'react-native-maps' },
    ],
    logo: '/projects/epa.png',
    copy: {
      es: {
        title: 'Epa — Red de encuentro universitario',
        context: 'Trabajo universitario · Universidad José Antonio Páez',
        summary:
          'Aplicación móvil para que los estudiantes de la UJAP organicen planes reales en el campus: un mapa de actividades, grupos de interés y chat, con verificación por correo institucional.',
        challenge:
          'El encargo era construir una aplicación completa para la comunidad universitaria. El problema de fondo: en una universidad grande la gente coincide en pasillos pero no llega a organizar nada, y no hay forma de saber quién es realmente estudiante activo.',
        solution: [
          'Mapa del campus como pantalla principal: cada plan es un pin con hora, creador y quiénes se han apuntado.',
          'Verificación obligatoria con correo institucional, de modo que dentro de la aplicación solo haya comunidad universitaria real.',
          'Grupos de interés por categoría — académico, deportes, tecnología, creatividad, arte — con chat individual y grupal.',
          'Navegación basada en archivos con Expo Router y estilos con NativeWind, es decir Tailwind CSS aplicado a React Native.',
          'Estado global con Zustand y TypeScript estricto en todo el proyecto.',
          'Modelo de dominio publicado como capa de tipos independiente en TypeScript — entidades, enumeraciones y DTO — para consumirlo desde un cliente web en Vue 3 sobre el mismo esquema PostgreSQL con Prisma.',
        ],
        impact: [
          'Identidad de producto y sistema de diseño definidos, no solo pantallas sueltas.',
          'Un mismo modelo de dominio, tipado, compartido entre el cliente móvil y el web.',
          'Verificación institucional como barrera de entrada desde el primer día.',
        ],
        role: 'Producto, modelo de datos, aplicación móvil y capa de tipos.',
      },
      en: {
        title: 'Epa — Campus Meetup Network',
        context: 'University assignment · Universidad José Antonio Páez',
        summary:
          'A mobile app for UJAP students to organise real plans on campus: an activity map, interest groups and chat, gated by institutional email verification.',
        challenge:
          'The brief was to build a complete application for the university community. The underlying problem: in a large university people cross paths in the hallways but rarely get anything organised, and there is no way to tell who is actually enrolled.',
        solution: [
          'The campus map as the main screen: every plan is a pin with its time, its host and who has signed up.',
          'Mandatory institutional-email verification, so the app only ever contains real university community.',
          'Interest groups by category — academic, sports, technology, creativity, art — with one-to-one and group chat.',
          'File-based navigation with Expo Router and styling through NativeWind, i.e. Tailwind CSS applied to React Native.',
          'Global state with Zustand and strict TypeScript throughout.',
          'The domain model published as a standalone TypeScript type layer — entities, enums and DTOs — to be consumed from a Vue 3 web client over the same PostgreSQL schema through Prisma.',
        ],
        impact: [
          'A defined product identity and design system, not just loose screens.',
          'One typed domain model shared between the mobile and web clients.',
          'Institutional verification as a gate from day one.',
        ],
        role: 'Product, data model, mobile app and type layer.',
      },
    },
  },

  {
    id: 'react-agent',
    no: '06',
    year: '2026',
    status: 'academic',
    stack: ['Python', 'Ollama', 'LLM local', 'ReAct', 'Flask', 'WSL2'],
    arch: [
      { label: 'Interfaz de informes', kind: 'client' },
      { label: 'Motor ReAct', kind: 'service', via: 'Python' },
      { label: 'Ollama local', kind: 'external', via: 'HTTP local' },
      { label: 'Acciones del dominio', kind: 'data', via: 'funciones reales' },
    ],
    copy: {
      es: {
        title: 'Agente de IA con patrón ReAct',
        context: 'Trabajo universitario · Ingeniería en Computación',
        summary:
          'Un agente que razona y actúa por turnos — pensamiento, acción, observación — sobre un modelo de lenguaje que corre entero en la máquina local, sin depender de ninguna API de pago.',
        challenge:
          'La restricción del trabajo era no depender de servicios externos de pago en tiempo de ejecución. Eso descarta las APIs comerciales, pero no la posibilidad de construir un agente propio.',
        solution: [
          'Implementación del patrón ReAct del artículo de Yao et al. (2022): el modelo alterna pensamiento, acción y observación hasta llegar a una respuesta final.',
          'Modelo de lenguaje abierto ejecutándose al cien por cien en local mediante Ollama, descargado una vez y usado sin conexión.',
          'Motor de control en Python que construye el prompt con ejemplos guiados, invoca al modelo, interpreta su respuesta y ejecuta funciones reales del dominio.',
          'Las observaciones las genera el entorno, no el modelo: cada acción llama a código Python verdadero y su resultado se reinyecta en el razonamiento.',
          'Documentación técnica y bitácora mantenidas en paralelo al código, como material base del trabajo académico.',
        ],
        impact: [
          'Agente funcional sobre hardware modesto, sin GPU y sin coste por consulta.',
          'Cero dependencias de servicios de terceros en tiempo de ejecución.',
          'Base documental lista para la redacción formal del trabajo.',
        ],
        role: 'Investigación, arquitectura del agente e implementación.',
      },
      en: {
        title: 'ReAct-Pattern AI Agent',
        context: 'University assignment · Computer Engineering',
        summary:
          'An agent that reasons and acts in turns — thought, action, observation — on top of a language model running entirely on the local machine, with no paid API involved.',
        challenge:
          'The assignment’s constraint was no dependency on paid external services at runtime. That rules out commercial APIs — but not building your own agent.',
        solution: [
          'Implementation of the ReAct pattern from Yao et al. (2022): the model alternates thought, action and observation until it reaches a final answer.',
          'An open-weights language model running fully locally through Ollama, downloaded once and used offline.',
          'A Python control engine that assembles the prompt with few-shot examples, calls the model, parses its response and executes real domain functions.',
          'Observations come from the environment, not the model: each action calls genuine Python code whose result is fed back into the reasoning loop.',
          'Technical documentation and a development log maintained alongside the code as the basis for the academic write-up.',
        ],
        impact: [
          'A working agent on modest hardware — no GPU, no per-query cost.',
          'Zero third-party service dependencies at runtime.',
          'Documentation base ready for the formal write-up.',
        ],
        role: 'Research, agent architecture and implementation.',
      },
    },
  },
]
