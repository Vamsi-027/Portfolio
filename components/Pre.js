'use client'

import { useState, useRef } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

export default function Pre({ children, ...props }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef(null)

  const handleCopy = () => {
    // Extract innerText from the child elements to avoid copying HTML formatting
    const code = preRef.current?.innerText || ''
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group/code-block my-8">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 rounded-md bg-neutral-900 border border-border text-muted-foreground hover:text-foreground opacity-0 group-hover/code-block:opacity-100 transition-opacity duration-200 z-10 hover:bg-neutral-800"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-xs text-green-400 font-sans font-medium">
            <FiCheck size={14} /> Copied
          </span>
        ) : (
          <FiCopy size={14} />
        )}
      </button>
      <pre 
        ref={preRef} 
        className="overflow-x-auto rounded-lg border border-border bg-[#050505] p-5 font-mono text-sm leading-relaxed" 
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
