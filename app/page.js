import TerminalHero from '../components/TerminalHero'
import Impact from '../components/Impact'
import Experience from '../components/Experience'
import Expertise from '../components/Expertise'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="min-h-screen">
      <TerminalHero />
      <Impact />
      <Experience />
      <Expertise />
      <Contact />
    </div>
  )
}