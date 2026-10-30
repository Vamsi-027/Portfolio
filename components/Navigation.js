'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSearch, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'

const destinations = [
  { name: 'Projects', hint: 'Agent Motif, Back2Cards, Agent Echo, SaamCars', href: '/#projects' },
  { name: 'Experience', hint: 'Zoho, Saint Louis University', href: '/#experience' },
  { name: 'Expertise', hint: 'Languages, frameworks, data, cloud', href: '/#expertise' },
  { name: 'Philosophy', hint: 'How I build', href: '/#about' },
  { name: 'Contact', hint: 'Email and links', href: '/#contact' },
  { name: 'Resume', hint: 'Google Drive', href: 'https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing', external: true },
  { name: 'GitHub', hint: 'Vamsi-027', href: 'https://github.com/Vamsi-027', external: true },
  { name: 'LinkedIn', hint: 'vamsi-cheruku-05a19a1b4', href: 'https://linkedin.com/in/vamsi-cheruku-05a19a1b4', external: true },
  { name: 'X', hint: '@cheruku_vamsi', href: 'https://x.com/cheruku_vamsi', external: true },
  { name: 'Email', hint: 'vamsicheruku18@gmail.com', href: 'mailto:vamsicheruku18@gmail.com' },
]

const Navigation = () => {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [isMac, setIsMac] = useState(true)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return destinations
    return destinations.filter((d) => `${d.name} ${d.hint}`.toLowerCase().includes(q))
  }, [query])

  const open = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    setQuery('')
    setActive(0)
    dialog.showModal()
    inputRef.current?.focus()
  }

  const close = () => dialogRef.current?.close()

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform))
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      const d = results[active]
      close()
      if (d.external) window.open(d.href, '_blank', 'noreferrer')
      else window.location.href = d.href
    }
  }

  return (
    <header className="nav">
      <div className="container nav__bar">
        <div className="nav__start">
          <a href="/" className="wordmark" aria-label="Vamsi Cheruku, home">Vamsi Cheruku</a>
          <ul className="nav__links">
            <li><a href="/#projects">Projects</a></li>
            <li><a href="/#experience">Experience</a></li>
            <li><a href="/#about">About</a></li>
          </ul>
        </div>

        <div className="nav__end">
          <button type="button" className="jump" onClick={open} aria-haspopup="dialog" aria-label="Jump to a section">
            <FiSearch aria-hidden="true" />
            <span className="jump__label">Jump to</span>
            <kbd className="key" aria-hidden="true">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <a
            className="nav__text"
            href="https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <ul className="nav__social">
            <li><a href="https://github.com/Vamsi-027" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub aria-hidden="true" /></a></li>
            <li><a href="https://linkedin.com/in/vamsi-cheruku-05a19a1b4" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin aria-hidden="true" /></a></li>
            <li><a href="https://x.com/cheruku_vamsi" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter aria-hidden="true" /></a></li>
          </ul>
          <a href="/#contact" className="pill pill--small">Get in touch</a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Jump to a section"
        onClick={(e) => { if (e.target === dialogRef.current) close() }}
      >
        <div className="palette__field">
          <FiSearch aria-hidden="true" />
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            name="jump"
            autoComplete="off"
            placeholder="Projects, experience, resume…"
            aria-label="Filter destinations"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `jump-${active}` : undefined}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onListKey}
          />
        </div>
        <ul id="palette-list" className="palette__list" role="listbox" aria-label="Destinations">
          {results.map((d, i) => (
            <li key={d.name} role="presentation">
              <a
                id={`jump-${i}`}
                role="option"
                aria-selected={i === active}
                className="palette__item"
                href={d.href}
                target={d.external ? '_blank' : undefined}
                rel={d.external ? 'noreferrer' : undefined}
                onMouseEnter={() => setActive(i)}
                onClick={close}
              >
                <span>{d.name}</span>
                <small>{d.hint}</small>
              </a>
            </li>
          ))}
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
        </ul>
      </dialog>
    </header>
  )
}

export default Navigation
