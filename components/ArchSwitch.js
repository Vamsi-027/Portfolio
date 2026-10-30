'use client'

import { useRef, useState } from 'react'
import Isometric from './Isometric'

// Architecture first, the real screenshot one tab away.
export default function ArchSwitch({ id, kind, label, variant, fig, title, children }) {
  const [tab, setTab] = useState('arch')
  const tabs = useRef([])
  const order = ['arch', 'shot']

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = order[(order.indexOf(tab) + 1) % 2]
    setTab(next)
    tabs.current[order.indexOf(next)]?.focus()
  }

  return (
    <>
      <div className="switch" role="tablist" aria-label="View">
        {order.map((t, i) => (
          <button
            key={t}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`${id}-tab-${t}`}
            aria-controls={`${id}-panel-${t}`}
            aria-selected={tab === t}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={onKey}
          >
            {t === 'arch' ? 'How it works' : 'Screenshot'}
          </button>
        ))}
      </div>
      <div className="switch__panel" role="tabpanel" id={`${id}-panel-arch`} aria-labelledby={`${id}-tab-arch`} hidden={tab !== 'arch'}>
        <Isometric kind={kind} label={label} variant={variant} fig={fig} title={title} />
      </div>
      <div className="switch__panel switch__panel--shot" role="tabpanel" id={`${id}-panel-shot`} aria-labelledby={`${id}-tab-shot`} hidden={tab !== 'shot'}>
        {children}
      </div>
    </>
  )
}
