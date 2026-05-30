import Link from 'next/link'
import { getAllContent, getDashboardMetrics } from '../../lib/content'
import Roadmap from '../../components/Roadmap'
import { FiArrowRight, FiBookOpen, FiBookmark, FiCompass, FiTerminal } from 'react-icons/fi'

export const metadata = {
  title: 'Learning Journey | Vamsi Cheruku',
  description: 'A public record of my journey from software engineering to AI systems and agentic AI. Technical reflections, studied resources, and notes.',
  alternates: {
    canonical: '/learning',
  },
}

export default async function LearningJourneyPage() {
  const articles = getAllContent('articles')
  const notes = getAllContent('notes')
  const metrics = getDashboardMetrics()

  const recentArticles = articles.slice(0, 3)
  const recentNotes = notes.slice(0, 4)

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Hero Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Learning Journey
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none font-sans text-white">
            Engineering My Way <br />
            <span className="text-muted-foreground">Into Agentic AI.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A public record of my journey from software engineering to AI systems and agentic AI.
          </p>
        </section>

        {/* Why This Exists */}
        <section className="p-6 bg-card border border-border rounded-lg max-w-3xl space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Why This Exists
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I'm documenting my journey from software engineering toward AI systems and agentic AI. This is not a tutorial website. It is a public record of what I'm studying, what I'm building understanding around, and how my thinking evolves over time.
          </p>
        </section>

        {/* Dynamic Navigation Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            href="/learning/resources" 
            className="p-6 bg-card border border-border rounded-lg hover:border-zinc-600 hover:bg-neutral-950/50 transition-all duration-300 group flex flex-col justify-between min-h-[150px] relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-neutral-950 border border-border/80 rounded text-muted-foreground group-hover:text-white transition-colors">
                <FiCompass size={18} />
              </div>
              <FiArrowRight className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" size={14} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-white transition-colors">
                Studied Resources
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Deep-dives & reflections on books, courses, and papers.
              </p>
            </div>
          </Link>

          <Link 
            href="/learning/articles" 
            className="p-6 bg-card border border-border rounded-lg hover:border-zinc-600 hover:bg-neutral-950/50 transition-all duration-300 group flex flex-col justify-between min-h-[150px] relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-neutral-950 border border-border/80 rounded text-muted-foreground group-hover:text-white transition-colors">
                <FiBookOpen size={18} />
              </div>
              <FiArrowRight className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" size={14} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-white transition-colors">
                Technical Articles
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Long-form conceptual logs on systems, calculus, and tensors.
              </p>
            </div>
          </Link>

          <Link 
            href="/learning/notes" 
            className="p-6 bg-card border border-border rounded-lg hover:border-zinc-600 hover:bg-neutral-950/50 transition-all duration-300 group flex flex-col justify-between min-h-[150px] relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-neutral-950 border border-border/80 rounded text-muted-foreground group-hover:text-white transition-colors">
                <FiBookmark size={18} />
              </div>
              <FiArrowRight className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" size={14} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-white transition-colors">
                Reference Notes
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Mathematical sheets, parameters tables, and architectures.
              </p>
            </div>
          </Link>
        </div>


        {/* Vertical Roadmap */}
        <section className="border-t border-border pt-12">
          <Roadmap />
        </section>

        {/* Recent Articles & Notes feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-border pt-12">
          {/* Articles feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FiBookOpen size={13} /> Recent Articles
              </h3>
              <Link href="/learning/articles" className="text-[10px] font-mono text-muted-foreground hover:text-foreground">
                View all articles →
              </Link>
            </div>

            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.slug} className="minimal-card p-6 bg-card hover:border-zinc-600 transition-colors">
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground mb-3">
                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="uppercase text-[9px]">{article.category}</span>
                  </div>

                  <Link href={`/learning/articles/${article.slug}`}>
                    <h4 className="text-lg font-bold text-foreground hover:text-white transition-colors tracking-tight">
                      {article.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-border/80 mt-4 text-[10px] font-mono text-muted-foreground">
                    <span>{article.readingTime} read</span>
                    <Link href={`/learning/articles/${article.slug}`} className="text-white hover:opacity-80 flex items-center gap-0.5 font-bold">
                      Read Reflection <FiArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes feed */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FiBookmark size={13} /> Recent Notes
              </h3>
              <Link href="/learning/notes" className="text-[10px] font-mono text-muted-foreground hover:text-foreground">
                View all notes →
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div key={note.slug} className="p-4 bg-card border border-border rounded-lg hover:border-zinc-800 transition-colors">
                  <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground mb-2">
                    <span>{note.date}</span>
                    <span className="uppercase text-neutral-500 font-semibold">{note.category}</span>
                  </div>
                  
                  <Link href={`/learning/notes/${note.category}/${note.slug}`}>
                    <h4 className="text-sm font-bold text-foreground hover:text-white transition-colors line-clamp-2 leading-snug">
                      {note.title}
                    </h4>
                  </Link>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-normal">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="pt-12 border-t border-border flex justify-between items-center text-[10px] font-mono text-muted-foreground">
          <span>Public AI Journey OS</span>
          <span>Last Updated: {metrics.lastUpdated}</span>
        </footer>

      </div>
    </div>
  )
}
