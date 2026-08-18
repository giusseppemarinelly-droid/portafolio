import { useEffect } from 'react'
import { useI18n } from './i18n/LanguageProvider'
import { useCounters, useReadingProgress, useScrollReveals } from './hooks/useAnime'
import { projects } from './data/projects'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { projectIdFromPath, useRouter } from './router/Router'

export default function App() {
  const { locale, t } = useI18n()
  const { path, navigate } = useRouter()

  const projectId = projectIdFromPath(path)
  const project = projectId ? projects.find((p) => p.id === projectId) : undefined

  // Una URL de proyecto que no existe no debe dejar la página en blanco: se
  // corrige la barra de direcciones y se vuelve a la portada.
  useEffect(() => {
    if (projectId && !project) navigate('/')
  }, [projectId, project, navigate])

  // El título de la pestaña acompaña a la ruta: es lo que se ve al compartir el
  // enlace de un proyecto o al tener varias pestañas abiertas.
  useEffect(() => {
    const base = 'Giusseppe Marinelly — ' + t.meta.role
    document.title = project ? `${project.copy[locale].title} · ${base}` : base
  }, [project, locale, t.meta.role])

  // La clave por ruta e idioma reprocesa los revelados: los marcadores viven en
  // el DOM y sin reinicio los nodos nuevos heredarían el estado de los viejos.
  useScrollReveals(`${path}-${locale}`)
  useCounters()
  useReadingProgress('#reading-progress')

  return (
    <div key={locale}>
      <div className="noise-layer" aria-hidden="true" />

      {/* Progreso de lectura. Solo se nota en las fichas, que son largas. */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-accent"
        id="reading-progress"
        aria-hidden="true"
      />

      <Nav />
      <main>{project ? <ProjectPage key={project.id} project={project} /> : <Home />}</main>
      <Footer />
    </div>
  )
}
