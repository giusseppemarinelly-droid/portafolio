import { useI18n } from './i18n/LanguageProvider'
import { useReveal } from './hooks/useReveal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { About } from './components/About'
import { StackSection } from './components/StackSection'
import { Work } from './components/Work'
import { Path } from './components/Path'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const { locale } = useI18n()
  useReveal()

  return (
    // La clave por idioma reinicia las animaciones de entrada al cambiar de idioma,
    // en lugar de dejar medio sitio traducido con el texto viejo aún animándose.
    <div key={locale}>
      <div className="noise-layer" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <StackSection />
        <Work />
        <Path />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
