# Portafolio — Giusseppe Marinelly

Portafolio personal bilingüe (español / inglés) en una sola página.
Vite + React 19 + TypeScript estricto + Tailwind CSS v4, sin dependencias de UI externas.

## Arranque

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

## Dónde se edita cada cosa

Todo el contenido vive separado del diseño, en `src/data/`:

| Archivo | Qué contiene |
|---|---|
| `src/data/copy.ts` | Datos de contacto, textos de todas las secciones y la trayectoria (trabajo y estudios), en ambos idiomas. |
| `src/data/projects.ts` | Las seis fichas de proyecto: reto, qué se construyó, resultado, tecnologías y diagrama de arquitectura. |
| `src/data/stack.ts` | Las herramientas agrupadas por capa. `level: 'core'` resalta las de uso diario. |
| `src/data/types.ts` | Los tipos que obligan a que ninguna traducción quede a medias. |

Si añades una clave en español, TypeScript no compilará hasta que exista también
en inglés. Es a propósito: evita que el sitio quede medio traducido.

### Añadir un proyecto

En `src/data/projects.ts`, copia una entrada existente y ajusta:

- `no`: la numeración editorial que se ve en la tarjeta (`'07'`).
- `status`: `production` (en producción), `active` (en desarrollo) o `academic` (trabajo universitario).
- `arch`: los nodos del diagrama. `kind` colorea cada capa —
  `client`, `service`, `data`, `hardware`, `external` — y `via` es la etiqueta
  del enlace entre un nodo y el anterior (`HTTP`, `RS-232`, `JWT`…).
- `link`: solo si el proyecto es público. Si no lo pones, la ficha muestra el
  aviso de código privado.

## Idioma y tema

- El idioma se elige con el conmutador **ES / EN** de la barra superior. La
  primera visita usa el idioma del navegador (español salvo que el navegador no
  lo hable) y la elección queda guardada en `localStorage`.
- El tema arranca en oscuro y se puede cambiar a claro. Se aplica en el `<head>`
  antes del primer pintado, así que no hay parpadeo al recargar.
- Ambas preferencias respetan `prefers-reduced-motion`: con animaciones
  reducidas, el contenido aparece sin transiciones.

## Publicar

El sitio es estático: sirve `dist/` en cualquier hosting.

**Vercel** (el más directo):

```bash
npm i -g vercel
vercel
```

`vercel.json` ya trae la configuración de build y las cabeceras de seguridad.

**Antes de publicar, revisa** el dominio en `<link rel="canonical">` y en las
etiquetas `og:` dentro de `index.html`.

## Diseño

Paleta «grafito + lima» definida con variables CSS en `src/index.css`: se cambian
los valores de `:root` (claro) y `.dark` (oscuro) y el sitio entero se recolorea,
porque ningún componente lleva un color escrito a mano.

Tipografía: **Space Grotesk** en titulares, **Inter** en texto corrido y
**JetBrains Mono** en etiquetas, cifras y diagramas.
