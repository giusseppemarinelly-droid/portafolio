import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Path } from '../components/Path'
import { StackSection } from '../components/StackSection'
import { Ticker } from '../components/Ticker'
import { Work } from '../components/Work'
import { useHeroIntro } from '../hooks/useAnime'

export function Home() {
  useHeroIntro()

  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <StackSection />
      <Work />
      <Path />
      <Contact />
    </>
  )
}
