'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stages = [
  {
    stage: 'Stage 1',
    title: 'Deep Learning Foundations',
    status: 'studied', // studied, exploring, upcoming, future
    description: 'Linear Algebra transformations, Calculus chain-rule, Backpropagation math, Vector-Jacobian Products.',
    link: '/learning/resources' // Links to 3Blue1Brown study reflections
  },
  {
    stage: 'Stage 2',
    title: 'Transformers',
    status: 'studied',
    description: 'Self-Attention mechanics, Q/K/V database retrieval projection, Multi-head dimensional mapping.',
    link: '/learning/resources' // Links to Attention Is All You Need / Illustrated Transformer
  },
  {
    stage: 'Stage 3',
    title: 'Tokenization',
    status: 'studied',
    description: 'Byte-Pair Encoding (BPE) vocabulary construction, spacing biases, and UTF-8 byte fallback strategies.',
    link: '/learning/articles/tokenization-is-more-important-than-most-people-think'
  },
  {
    stage: 'Stage 4',
    title: 'GPT Architecture',
    status: 'exploring',
    description: 'Decoder-only autoregressive models, causal masking, LayerNorm (Pre-LN), and parameter initializations.',
    link: '/learning/articles/building-gpt-changed-how-i-think-about-llms'
  },
  {
    stage: 'Stage 5',
    title: 'Prompt Engineering',
    status: 'upcoming',
    description: 'System prompting, few-shot conditioning, chain-of-thought orchestration, XML output delimiters, and instruction alignment.',
  },
  {
    stage: 'Stage 6',
    title: 'Tool Calling',
    status: 'future',
    description: 'Structured JSON Schema definitions, active function-calling loops, and execution control.',
  },
  {
    stage: 'Stage 7',
    title: 'Model Context Protocol (MCP)',
    status: 'future',
    description: 'Standardizing tool integrations over stdio/SSE JSON-RPC protocols.',
  },
  {
    stage: 'Stage 8',
    title: 'Agent Systems',
    status: 'future',
    description: 'Autonomous execution loops, ReAct reasoning loops, and multi-agent task fanning.',
  },
  {
    stage: 'Stage 9',
    title: 'Memory',
    status: 'future',
    description: 'Short-term execution state vs long-term semantic vector database retrieval.',
  },
  {
    stage: 'Stage 10',
    title: 'Context Engineering',
    status: 'future',
    description: 'Dynamic context window pruning, token optimization, and semantic context compression.',
  },
  {
    stage: 'Stage 11',
    title: 'Agent Infrastructure',
    status: 'future',
    description: 'Trajectory trace logs, assertion evaluations, and distributed agent execution hosting.',
  }
]

export default function Roadmap() {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'studied':
        return {
          label: 'Studied',
          badgeClass: 'text-zinc-400 bg-zinc-900 border-zinc-800',
          dotClass: 'bg-zinc-700'
        }
      case 'exploring':
        return {
          label: 'Exploring',
          badgeClass: 'text-white bg-neutral-900 border-neutral-700 font-semibold',
          dotClass: 'bg-white'
        }
      case 'upcoming':
        return {
          label: 'Upcoming',
          badgeClass: 'text-zinc-500 bg-transparent border-zinc-800 border-dashed',
          dotClass: 'bg-zinc-800'
        }
      case 'future':
      default:
        return {
          label: 'Future',
          badgeClass: 'text-zinc-600 bg-transparent border-zinc-900',
          dotClass: 'bg-zinc-900'
        }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
          Learning Roadmap
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          A linear roadmap detailing my study progression and planned topics.
        </p>
      </div>

      <div className="relative pl-6 space-y-8">
        {/* Timeline Line */}
        <div className="absolute left-[9px] top-3 bottom-3 w-[1px] bg-border z-0" />

        {stages.map((stage, idx) => {
          const style = getStatusStyle(stage.status)

          return (
            <div key={stage.stage} className="relative z-10 flex gap-6 items-start group">
              {/* Timeline Dot */}
              <div 
                className={`absolute left-[-21px] top-1.5 w-3 h-3 rounded-full border border-border bg-black flex items-center justify-center`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${style.dotClass}`} />
              </div>

              {/* Text content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {stage.stage}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${style.badgeClass}`}>
                    {style.label}
                  </span>
                </div>
                
                <h4 className="text-sm font-bold text-foreground transition-colors group-hover:text-white">
                  {stage.link ? (
                    <Link href={stage.link} className="hover:underline">
                      {stage.title}
                    </Link>
                  ) : (
                    stage.title
                  )}
                </h4>
                
                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                  {stage.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
