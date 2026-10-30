import Hero from '../components/Hero'
import Impact from '../components/Impact'
import Experience from '../components/Experience'
import Expertise from '../components/Expertise'
import About from '../components/About'
import Contact from '../components/Contact'

export default async function Home({ searchParams }) {
  // the manual-style figures by default; ?art=iso shows the isometric line drawings
  const params = await searchParams
  const art = params?.art === 'iso' ? 'iso' : 'manual'
  return (
    <>
      <Hero />
      <Impact art={art} />
      <Experience />
      <Expertise art={art} />
      <About />
      <Contact />
    </>
  )
}
