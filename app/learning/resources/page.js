import Link from 'next/link'
import { FiArrowLeft, FiCompass, FiCode, FiGithub, FiExternalLink, FiBookmark, FiBookOpen, FiArrowRight } from 'react-icons/fi'
import { getAllContent, getContentBySlug } from '../../../lib/content'

export const metadata = {
  title: 'Resources & Repositories | AI Learning Journey',
  description: 'Reflective reviews of studied materials and tracking codebases I am exploring in systems-level AI.',
}

const repositoriesByStage = {
  'Stage 3': [
    {
      name: 'Karpathy/minbpe',
      status: 'Upcoming',
      purpose: 'A clean, educational Python library implementing BPE tokenization.',
      whyStudying: 'To study the exact token-merge iterations, regex splitting, and byte-level fallback configurations.',
      concepts: ['BPE Vocabulary Merges', 'Regex Splitting Patterns', 'Byte Fallback Mapping'],
      link: 'https://github.com/karpathy/minbpe'
    }
  ],
  'Stage 4': [
    {
      name: 'Karpathy/nanoGPT',
      status: 'Exploring',
      purpose: 'The cleanest, fastest repository for training medium-scale decoder-only transformers.',
      whyStudying: 'To study the training loop structure, learning rate cosine schedules, and multi-GPU DDP abstractions.',
      concepts: ['Cosine Warmup Schedulers', 'Weight Initialization', 'PyTorch DDP Abstractions'],
      link: 'https://github.com/karpathy/nanoGPT'
    },
    {
      name: 'Karpathy/llm.c',
      status: 'Future',
      purpose: 'LLM training written in raw C/CUDA without heavy PyTorch dependencies.',
      whyStudying: 'To understand the low-level systems engineering of backprop math running directly on GPU registers.',
      concepts: ['Custom CUDA Kernels', 'Memory-Mapped Files', 'Hardware-Level Backpropagation'],
      link: 'https://github.com/karpathy/llm.c'
    },
    {
      name: 'ggml-org/llama.cpp',
      status: 'Future',
      purpose: 'Inference engine for LLaMA models in pure C/C++.',
      whyStudying: 'To study quantizations (INT8/INT4), KV caching optimizations, and thread pool orchestration on local processors.',
      concepts: ['Model Quantization', 'Inference CPU Abstractions', 'KV Cache Orchestration'],
      link: 'https://github.com/ggerganov/llama.cpp'
    }
  ],
  'Stage 7': [
    {
      name: 'modelcontextprotocol/servers',
      status: 'Future',
      purpose: 'Exemplar MCP servers implementing tools and resources.',
      whyStudying: 'To explore stdio/SSE transport boundary checks and tool exposure designs.',
      concepts: ['JSON-RPC Schemas', 'Security Sandboxing', 'Protocol Transport Layouts'],
      link: 'https://github.com/modelcontextprotocol/servers'
    }
  ]
}

export default async function ResourcesPage() {
  const dbResources = getAllContent('resources')

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'exploring':
        return 'text-white border-neutral-700 bg-neutral-900 font-semibold'
      case 'upcoming':
        return 'text-zinc-500 border-zinc-800 bg-transparent border-dashed'
      case 'future':
      default:
        return 'text-zinc-600 border-zinc-900 bg-transparent'
    }
  }

  // Group resources by stage
  const resourcesByStage = dbResources.reduce((acc, res) => {
    const stage = res.stage || 'Stage 1'
    if (!acc[stage]) acc[stage] = []
    acc[stage].push(res)
    return acc
  }, {})

  const stagesList = [
    { key: 'Stage 1', title: 'Deep Learning Foundations', desc: 'Linear Algebra, calculus chain-rule, and backpropagation math.' },
    { key: 'Stage 2', title: 'Transformers', desc: 'Self-Attention mechanics, query/key/value dot products, and multi-head splits.' },
    { key: 'Stage 3', title: 'Tokenization', desc: 'Byte-Pair Encoding (BPE) vocab construction and byte fallback strategies.' },
    { key: 'Stage 4', title: 'GPT Architecture', desc: 'Decoder-only models, causal masking, and LayerNorm placement.' },
    { key: 'Stage 7', title: 'Model Context Protocol (MCP)', desc: 'Standardizing tool integrations over stdio/SSE JSON-RPC protocols.' }
  ]

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/learning" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center gap-2">
            <FiCompass className="text-muted-foreground" size={28} /> Resources & Exploration
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Reflective notes on completed study resources, integrated with codebases I am exploring in systems-level AI.
          </p>
        </div>

        {/* Resources & Repositories Section */}
        <section className="space-y-12 pt-10 border-t border-border">
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Timeline Progression
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Study reviews and codebase exploration grouped by roadmap stages.
            </p>
          </div>
          
          <div className="space-y-16">
            {stagesList.map((stageInfo) => {
              const stageResources = resourcesByStage[stageInfo.key] || []
              const stageRepos = repositoriesByStage[stageInfo.key] || []
              
              return (
                <div key={stageInfo.key} className="space-y-6">
                  {/* Stage Header */}
                  <div className="border-b border-border/60 pb-3 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-border/80 rounded text-zinc-400 font-semibold uppercase">
                        {stageInfo.key}
                      </span>
                      <h2 className="text-lg font-bold tracking-tight text-white font-sans">
                        {stageInfo.title}
                      </h2>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {stageInfo.desc}
                    </p>
                  </div>

                  {/* Stage Content: Split or Grid */}
                  <div className="space-y-6">
                    {/* 1. Resources Sub-section */}
                    {stageResources.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block">
                          Studied Materials ({stageResources.length})
                        </span>
                        
                        <div className="space-y-6">
                          {stageResources.map((res) => {
                            // Resolve related articles
                            const relatedArticles = (res.relatedArticles || []).map(slug => {
                              const art = getContentBySlug('articles', slug)
                              return art ? { name: art.title, path: `/learning/articles/${slug}` } : null
                            }).filter(Boolean)

                            // Resolve related notes
                            const relatedNotes = (res.relatedNotes || []).map(noteRef => {
                              const [category, slug] = noteRef.includes('/') ? noteRef.split('/') : ['general', noteRef]
                              const note = getContentBySlug('notes', slug, category)
                              return note ? { name: note.title, path: `/learning/notes/${category}/${slug}` } : null
                            }).filter(Boolean)

                            return (
                              <div 
                                key={res.slug} 
                                className="minimal-card p-6 md:p-8 bg-card flex flex-col gap-6 hover:border-zinc-800 transition-colors"
                              >
                                <div>
                                  <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">
                                    {res.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                    {res.summary}
                                  </p>

                                  {/* Most Valuable Insight */}
                                  {res.insight && (
                                    <div className="pl-4 border-l border-zinc-500 my-4 text-xs font-mono text-zinc-300">
                                      <span className="text-zinc-500 font-bold block mb-1 text-[9px] uppercase tracking-wider">Most Valuable Insight</span>
                                      "{res.insight}"
                                    </div>
                                  )}

                                  <div className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-4">
                                    <span className="text-xs font-mono text-white block mb-1 uppercase tracking-wider">Personal Reflection</span>
                                    <p className="whitespace-pre-line">{res.content.trim()}</p>
                                  </div>
                                </div>

                                {/* Concepts grid */}
                                {res.concepts && res.concepts.length > 0 && (
                                  <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Concepts Gained</span>
                                    <div className="flex flex-wrap gap-2">
                                      {res.concepts.map((concept, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-neutral-950 border border-border rounded text-[10px] font-mono text-zinc-400">
                                          {concept}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Related Links */}
                                {(relatedArticles.length > 0 || relatedNotes.length > 0) && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border mt-2 text-xs font-mono">
                                    {relatedArticles.length > 0 && (
                                      <div className="space-y-2">
                                        <span className="text-zinc-500 uppercase text-[9px] tracking-wider block">Related Articles</span>
                                        {relatedArticles.map((art, idx) => (
                                          <Link key={idx} href={art.path} className="flex items-center gap-1.5 text-zinc-300 hover:text-white underline">
                                            <FiBookOpen size={12} /> {art.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                    {relatedNotes.length > 0 && (
                                      <div className="space-y-2">
                                        <span className="text-zinc-500 uppercase text-[9px] tracking-wider block">Related Notes</span>
                                        {relatedNotes.map((note, idx) => (
                                          <Link key={idx} href={note.path} className="flex items-center gap-1.5 text-zinc-300 hover:text-white underline">
                                            <FiBookmark size={12} /> {note.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2. Repositories Sub-section */}
                    {stageRepos.length > 0 && (
                      <div className="space-y-4 pt-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block flex items-center gap-1">
                          <FiCode size={10} /> Associated Codebases ({stageRepos.length})
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {stageRepos.map((repo) => (
                            <div 
                              key={repo.name} 
                              className="minimal-card p-5 bg-card flex flex-col justify-between hover:border-zinc-800 transition-colors"
                            >
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-foreground font-mono">
                                    {repo.name}
                                  </h4>
                                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${getStatusColor(repo.status)}`}>
                                    {repo.status}
                                  </span>
                                </div>

                                <p className="text-xs text-muted-foreground leading-normal">
                                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Purpose</span>
                                  {repo.purpose}
                                </p>

                                <p className="text-xs text-muted-foreground leading-normal">
                                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Why I'm studying it</span>
                                  {repo.whyStudying}
                                </p>

                                <div className="space-y-1">
                                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Key Concepts</span>
                                  <div className="flex flex-wrap gap-1">
                                    {repo.concepts.map((concept, idx) => (
                                      <span key={idx} className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-950 border border-border/80 rounded text-zinc-400">
                                        {concept}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-border/60 mt-4 flex justify-end">
                                <a 
                                  href={repo.link} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-white transition-colors"
                                >
                                  <FiGithub size={11} /> View Code <FiExternalLink size={8} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
