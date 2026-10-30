const columns = [
  {
    title: 'Pages',
    links: [
      { name: 'Projects', href: '/#projects' },
      { name: 'Experience', href: '/#experience' },
      { name: 'Skills', href: '/#expertise' },
      { name: 'About', href: '/#about' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { name: 'Agent Motif', href: '/#agent-motif' },
      { name: 'Agent Echo', href: '/#agent-echo' },
      { name: 'Back2Cards', href: '/#back2cards' },
      { name: 'SaamCars', href: '/#saamcars' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'Email', href: 'mailto:vamsicheruku18@gmail.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/vamsi-cheruku-05a19a1b4', external: true },
      { name: 'GitHub', href: 'https://github.com/Vamsi-027', external: true },
      { name: 'X', href: 'https://x.com/cheruku_vamsi', external: true },
      { name: 'Resume', href: 'https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing', external: true },
    ],
  },
]

const Contact = () => {
  return (
    <>
      <section id="contact" className="close" aria-labelledby="contact-title">
        <h2 id="contact-title">Let’s talk systems.</h2>
        <p>
          Looking for backend, infrastructure and AI engineering roles. Based in St. Louis, open to relocating.
        </p>
        <div className="close__actions">
          <a href="mailto:vamsicheruku18@gmail.com" className="pill pill--ink">Email me</a>
          <a
            href="https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="pill pill--line"
          >
            Read resume
          </a>
        </div>
        <a className="close__mail" href="mailto:vamsicheruku18@gmail.com">vamsicheruku18@gmail.com</a>
      </section>

      <footer className="foot" aria-label="Site footer">
        <div className="container foot__top">
          <div className="foot__brand">
            <a href="/" className="wordmark">Vamsi Cheruku</a>
            <p>© {new Date().getFullYear()} Vamsi Cheruku</p>
            <p>Saint Louis, MO, USA</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} className="foot__col" aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noreferrer' : undefined}
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="foot__mark" aria-hidden="true">
          <svg viewBox="0 0 1000 150" preserveAspectRatio="xMidYMin meet">
            <text x="500" y="128" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs">Vamsi Cheruku</text>
          </svg>
        </div>
      </footer>
    </>
  )
}

export default Contact
