import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '../../../../../lib/content'
import MDXRenderer from '../../../../../components/MDXRenderer'
import ShareButtons from '../../../../../components/ShareButtons'
import { FiArrowLeft, FiHash } from 'react-icons/fi'

export async function generateStaticParams() {
  const notes = getAllContent('notes')
  return notes.map(note => ({
    category: note.category,
    slug: note.slug
  }))
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params
  const item = getContentBySlug('notes', slug, category)

  if (!item) {
    return {
      title: 'Note Not Found | AI Learning Journey',
      description: 'The requested reference note could not be found.',
    }
  }

  return {
    title: `${item.title} (${item.category}) | AI Learning Journey`,
    description: item.description || `Technical note on ${item.title} in the ${item.category} category.`,
    alternates: {
      canonical: `/learning/notes/${category}/${slug}`,
    },
  }
}

export default async function NoteReaderPage({ params }) {
  const { category, slug } = await params
  const note = getContentBySlug('notes', slug, category)

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-foreground pt-32 pb-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/learning/notes" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono group"
        >
          <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back to Notes
        </Link>

        <div className="space-y-8">
          <header className="space-y-4 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-neutral-950 rounded text-white text-[9px] uppercase font-semibold border border-border">
                {note.category}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {note.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white font-sans">
              {note.title}
            </h1>

            {note.description && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {note.description}
              </p>
            )}

            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {note.tags.map((tag) => (
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
          <article className="prose prose-invert max-w-none prose-pre:border prose-pre:border-border">
            <MDXRenderer source={note.content} />
          </article>

          {/* Share Widget / Footer */}
          <div className="space-y-3 border-t border-border pt-12 mt-12">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Share Reference Sheet
            </h4>
            <ShareButtons title={note.title} slug={`notes/${category}/${slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
