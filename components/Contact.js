const links = [
  { name: 'Email', href: 'mailto:vamsicheruku18@gmail.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/vamsi-cheruku-05a19a1b4', external: true },
  { name: 'GitHub', href: 'https://github.com/Vamsi-027', external: true },
  { name: 'Resume', href: 'https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing', external: true },
]

const Contact = () => {
  return (
    <footer id="contact" className="close" aria-labelledby="contact-title">
      <div className="container">
        <div className="close__statement">
          <h2 id="contact-title">Let’s talk systems.</h2>
          <p>
            I’m actively seeking new roles in Backend Engineering or Systems Architecture starting May 2026. My inbox is always open.
          </p>
          <a className="close__mail" href="mailto:vamsicheruku18@gmail.com">vamsicheruku18@gmail.com</a>
        </div>

        <div className="close__foot">
          <ul className="linkrow">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  className="link"
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="close__legal">
            <p>Saint Louis, MO, USA</p>
            <p>© {new Date().getFullYear()} Vamsi Cheruku. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
