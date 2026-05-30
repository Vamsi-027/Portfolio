import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '../../../../lib/content'
import MDXRenderer from '../../../../components/MDXRenderer'
import ShareButtons from '../../../../components/ShareButtons'
import TOC from '../../../../components/TOC'
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCalendar, FiClock, FiExternalLink, FiHash } from 'react-icons/fi'

export async function generateStaticParams() {
  const articles = getAllContent('articles')
  return articles.map(art => ({ slug: art.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = getContentBySlug('articles', slug)

  if (!item) {
    return {
      title: 'Article Not Found | AI Learning Journey',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${item.title} | AI Learning Journey`,
    description: item.description || `Read about ${item.title} on Vamsi Cheruku's learning journey.`,
    alternates: {
      canonical: `/learning/articles/${slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `https://vamsicheruku.dev/learning/articles/${slug}`,
      type: 'article',
      publishedTime: item.date,
      authors: ['Vamsi Cheruku'],
      tags: item.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
    },
  }
}

export default async function ArticleReaderPage({ params }) {
  const { slug } = await params
  const article = getContentBySlug('articles', slug)

  if (!article) {
    notFound()
  }

  // Get index for Prev/Next navigation
  const articlesList = getAllContent('articles')
  const currentIdx = articlesList.findIndex(i => i.slug === slug)
  const nextItem = currentIdx > 0 ? articlesList[currentIdx - 1] : null
  const prevItem = currentIdx !== -1 && currentIdx < articlesList.length - 1 ? articlesList[currentIdx + 1] : null

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/learning/articles" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono group"
        >
          <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back to Articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Metadata (Col Span 3) */}
          <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4 font-mono text-xs text-muted-foreground bg-card border border-border p-4 rounded-lg">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="uppercase text-[9px] tracking-wider font-bold text-foreground">Category</span>
                <span className="px-2 py-0.5 bg-neutral-950 rounded text-white text-[9px] uppercase font-semibold border border-border">
                  {article.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiCalendar size={13} />
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiClock size={13} />
                <span>{article.readingTime} read</span>
              </div>
            </div>

            {/* Resources list */}
            {article.resources && article.resources.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FiBookOpen size={12} /> Reference Sources
                </h4>
                <ul className="space-y-2">
                  {article.resources.map((resStr, rIdx) => {
                    const parts = resStr.split(' - ')
                    const name = parts[0]
                    const url = parts[1] || '#'
                    return (
                      <li key={rIdx}>
                        <a 
                          href={url}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-muted-foreground hover:text-foreground flex items-start gap-1 leading-normal"
                        >
                          <FiExternalLink className="mt-0.5 flex-shrink-0" size={11} />
                          <span className="underline line-clamp-2">{name}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Share Widget */}
            <div className="space-y-3 border-t border-border pt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Share Reflection
              </h4>
              <ShareButtons title={article.title} slug={`articles/${slug}`} />
            </div>
          </div>

          {/* Center Column: Title & MDX Content (Col Span 6) */}
          <div className="lg:col-span-6 space-y-8">
            <header className="space-y-4 pb-6 border-b border-border">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                {article.title}
              </h1>

              {article.description && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              )}

              {/* Tag badges */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-mono text-muted-foreground flex items-center gap-0.5 bg-neutral-950 px-2 py-0.5 border border-border rounded"
                    >
                      <FiHash size={10} /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Main content body */}
            <article className="prose prose-invert max-w-none">
              <MDXRenderer source={article.content} />
            </article>

            {/* Footer Navigation (Prev/Next Item) */}
            {(prevItem || nextItem) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-12 mt-16 font-mono text-xs">
                {prevItem ? (
                  <Link 
                    href={`/learning/articles/${prevItem.slug}`} 
                    className="p-4 bg-card border border-border rounded-lg flex flex-col justify-between hover:border-zinc-500 transition-all text-left"
                  >
                    <span className="text-muted-foreground mb-2 flex items-center gap-1"><FiArrowLeft /> Previous</span>
                    <span className="text-sm font-bold text-foreground line-clamp-1">{prevItem.title}</span>
                  </Link>
                ) : (
                  <div className="p-4 bg-neutral-950/20 border border-border/30 rounded-lg opacity-40 text-left">
                    <span className="text-muted-foreground mb-2 block">Previous</span>
                    <span className="text-sm font-bold text-foreground">Beginning of Articles</span>
                  </div>
                )}

                {nextItem ? (
                  <Link 
                    href={`/learning/articles/${nextItem.slug}`} 
                    className="p-4 bg-card border border-border rounded-lg flex flex-col justify-between hover:border-zinc-500 transition-all text-right"
                  >
                    <span className="text-muted-foreground mb-2 flex items-center gap-1 justify-end">Next <FiArrowRight /></span>
                    <span className="text-sm font-bold text-foreground line-clamp-1">{nextItem.title}</span>
                  </Link>
                ) : (
                  <div className="p-4 bg-neutral-950/20 border border-border/30 rounded-lg opacity-40 text-right">
                    <span className="text-muted-foreground mb-2 block">Next</span>
                    <span className="text-sm font-bold text-foreground">End of Articles</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Table of Contents (Col Span 3) */}
          <div className="lg:col-span-3 sticky top-28 hidden lg:block">
            <TOC />
          </div>

        </div>
      </div>
    </div>
  )
}
