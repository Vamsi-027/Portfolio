import Link from 'next/link'
import { getAllContent } from '../../../lib/content'
import { FiArrowLeft, FiBookOpen, FiArrowRight, FiHash, FiClock } from 'react-icons/fi'

export const metadata = {
  title: 'Articles | AI Learning Journey',
  description: 'In-depth conceptual reflections on neural networks, transformers, tokenization, and decoder models.',
}

export default function ArticlesIndexPage() {
  const articles = getAllContent('articles')

  // Group articles by stage
  const groupedArticles = articles.reduce((acc, art) => {
    const stage = art.stage || 'Stage 1'
    if (!acc[stage]) acc[stage] = []
    acc[stage].push(art)
    return acc
  }, {})

  const stagesList = [
    { key: 'Stage 1', title: 'Deep Learning Foundations', desc: 'Linear Algebra and backpropagation math.' },
    { key: 'Stage 2', title: 'Transformers', desc: 'Self-Attention mechanics and Q/K/V retrievals.' },
    { key: 'Stage 3', title: 'Tokenization', desc: 'Byte-Pair Encoding (BPE) vocab construction.' },
    { key: 'Stage 4', title: 'GPT Architecture', desc: 'Decoder-only models and next-token prediction limits.' }
  ]

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/learning" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Technical <span className="text-muted-foreground">Articles.</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            In-depth conceptual logs documenting my understanding of neural network calculations, self-attention, token borders, and language decoding systems.
          </p>
        </div>

        {/* Stage-wise List */}
        <div className="space-y-16 pt-6 border-t border-border">
          {stagesList.map((stageInfo) => {
            const stageArticles = groupedArticles[stageInfo.key] || []
            if (stageArticles.length === 0) return null

            return (
              <div key={stageInfo.key} className="space-y-6">
                {/* Stage Header */}
                <div className="border-b border-border/60 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-border/80 rounded text-zinc-400 font-semibold uppercase">
                      {stageInfo.key}
                    </span>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {stageInfo.title}
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {stageInfo.desc}
                  </p>
                </div>

                {/* Articles Stack */}
                <div className="space-y-6">
                  {stageArticles.map((article) => (
                    <div key={article.slug} className="minimal-card p-6 md:p-8 bg-card hover:border-zinc-600 transition-colors flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground mb-4">
                          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="uppercase text-[10px] bg-neutral-950 px-2 py-0.5 border border-border rounded font-semibold text-white">
                            {article.category}
                          </span>
                        </div>

                        <Link href={`/learning/articles/${article.slug}`}>
                          <h3 className="text-xl font-bold text-foreground hover:text-white transition-colors tracking-tight">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-6">
                          {article.description}
                        </p>

                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.map((tag) => (
                              <span key={tag} className="text-[10px] font-mono text-zinc-500 flex items-center gap-0.5">
                                <FiHash size={9} /> {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border flex justify-between items-center text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1"><FiClock size={12} /> {article.readingTime} read</span>
                        <Link href={`/learning/articles/${article.slug}`} className="text-white hover:opacity-80 flex items-center gap-1 group/btn font-bold">
                          Read Reflection <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
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
