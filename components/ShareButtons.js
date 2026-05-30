'use client'

import { useState } from 'react'
import { FiTwitter, FiLinkedin, FiLink, FiCheck } from 'react-icons/fi'

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/learning/${slug}` : ''
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${title} on Vamsi Cheruku's Learning OS!`)}&url=${encodeURIComponent(
          typeof window !== 'undefined' ? `${window.location.origin}/learning/${slug}` : ''
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-neutral-950 border border-border rounded text-muted-foreground hover:text-foreground hover:bg-neutral-900 transition-colors"
        aria-label="Share on Twitter"
      >
        <FiTwitter size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          typeof window !== 'undefined' ? `${window.location.origin}/learning/${slug}` : ''
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-neutral-950 border border-border rounded text-muted-foreground hover:text-foreground hover:bg-neutral-900 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FiLinkedin size={14} />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 bg-neutral-950 border border-border rounded text-muted-foreground hover:text-foreground hover:bg-neutral-900 transition-colors flex items-center gap-1"
        aria-label="Copy link"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-[10px] text-green-400 font-mono font-medium">
            <FiCheck size={14} /> Copied
          </span>
        ) : (
          <FiLink size={14} />
        )}
      </button>
    </div>
  )
}
