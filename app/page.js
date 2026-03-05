import Hero from '../components/Hero'
import About from '../components/About'
import Impact from '../components/Impact'
import Experience from '../components/Experience'
import Expertise from '../components/Expertise'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Expertise />
      <Impact />
      <Contact />
    </div>
  )
}