'use client'

import { useEffect, useState } from 'react'

export default function TOC() {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Find all headings within the MDX renderer container
    const contentElement = document.querySelector('.mdx-content')
    if (!contentElement) return

    const headingElements = Array.from(
      contentElement.querySelectorAll('h2, h3')
    )

    const parsedHeadings = headingElements.map((el) => ({
      id: el.id,
      text: el.innerText || el.textContent,
      level: el.tagName === 'H2' ? 2 : 3,
    })).filter(h => h.id)

    setHeadings(parsedHeadings)

    // IntersectionObserver to sync active header on scroll
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px', // Trigger when heading is near the top
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    headingElements.forEach((el) => observer.observe(el))

    return () => {
      headingElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  if (headings.length === 0) return null

  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      })
      // Manually set active index in case intersection doesn't trigger immediately
      setActiveId(id)
    }
  }

  return (
    <nav className="space-y-4" aria-label="Table of Contents">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
        On this page
      </h4>
      <ul className="space-y-3 text-xs">
        {headings.map((heading) => (
          <li 
            key={heading.id}
            className={`${heading.level === 3 ? 'pl-4' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleScrollTo(e, heading.id)}
              className={`block py-0.5 transition-colors duration-150 leading-relaxed ${
                activeId === heading.id
                  ? 'text-white font-medium border-l border-white pl-2 -ml-2'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
