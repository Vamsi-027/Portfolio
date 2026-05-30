import Link from 'next/link'
import { getAllContent } from '../../../lib/content'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export const metadata = {
  title: 'Technical Notes | AI Learning Journey',
  description: 'A repository of mathematical derivations, architecture cheatsheets, hyperparameter profiles, and reference logs from studying AI models.',
}

const STAGES = [
  { key: 'math', label: 'Stage 1: Deep Learning Foundations', desc: 'Calculus derivatives, gradients, and backpropagation math.' },
  { key: 'attention', label: 'Stage 2: Transformers', desc: 'Self-attention queries, keys, values, and multi-head splits.' },
  { key: 'tokenization', label: 'Stage 3: Tokenization', desc: 'BPE merges, vocabulary builders, and UTF-8 byte fallbacks.' },
  { key: 'gpt', label: 'Stage 4: GPT Architecture', desc: 'Decoder-only blocks, causal masking, and LayerNorm placements.' }
]

export default function NotesHubPage() {
  const notes = getAllContent('notes')

  // Group notes by category
  const groupedNotes = notes.reduce((acc, note) => {
    const cat = note.category.toLowerCase()
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(note)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/learning" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Reference <span className="text-muted-foreground">Notes.</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Concise reference sheets, mathematical derivations, parameter bounds, and architecture summaries compiled during active research.
          </p>
        </div>

        {/* Stages Grid */}
        <div className="space-y-12 pt-10 border-t border-border">
          {STAGES.map((stageSpec) => {
            const stageNotes = groupedNotes[stageSpec.key] || []
            if (stageNotes.length === 0) return null

            return (
              <div key={stageSpec.key} className="space-y-6">
                {/* Stage Header */}
                <div className="border-b border-border/60 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-border/80 rounded text-zinc-400 font-semibold uppercase">
                      {stageSpec.key === 'math' ? 'Stage 1' : stageSpec.key === 'attention' ? 'Stage 2' : stageSpec.key === 'tokenization' ? 'Stage 3' : 'Stage 4'}
                    </span>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {stageSpec.label.split(': ')[1]} ({stageNotes.length})
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {stageSpec.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stageNotes.map((note) => (
                    <div 
                      key={note.slug} 
                      className="p-5 bg-card border border-border rounded-lg flex flex-col justify-between hover:border-zinc-800 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                          <span>{note.date}</span>
                        </div>

                        <Link href={`/learning/notes/${stageSpec.key}/${note.slug}`}>
                          <h3 className="text-base font-bold text-foreground hover:text-white transition-colors leading-snug">
                            {note.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                          {note.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                        <div className="flex gap-1">
                          {note.tags?.slice(0, 1).map(tag => (
                            <span key={tag} className="text-zinc-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/learning/notes/${stageSpec.key}/${note.slug}`} className="text-white hover:opacity-80 flex items-center gap-0.5">
                          View Sheet <FiArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
