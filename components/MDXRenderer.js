import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import Pre from './Pre'

// Custom component overrides for MDX
const components = {
  pre: Pre,
  h2: (props) => (
    <h2 
      className="text-2xl font-bold tracking-tight text-foreground mt-12 mb-4 scroll-mt-24 border-b border-border pb-2" 
      {...props} 
    />
  ),
  h3: (props) => (
    <h3 
      className="text-xl font-bold tracking-tight text-foreground mt-8 mb-4 scroll-mt-24" 
      {...props} 
    />
  ),
  p: (props) => (
    <p 
      className="text-muted-foreground text-base leading-relaxed mb-6" 
      {...props} 
    />
  ),
  ul: (props) => (
    <ul 
      className="list-disc pl-6 mb-6 text-muted-foreground space-y-2 text-base" 
      {...props} 
    />
  ),
  ol: (props) => (
    <ol 
      className="list-decimal pl-6 mb-6 text-muted-foreground space-y-2 text-base" 
      {...props} 
    />
  ),
  li: (props) => (
    <li 
      className="leading-relaxed" 
      {...props} 
    />
  ),
  blockquote: (props) => (
    <blockquote 
      className="border-l-2 border-white pl-6 italic text-muted-foreground my-8 text-base bg-neutral-950/40 py-4 rounded-r" 
      {...props} 
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto w-full my-8">
      <table 
        className="w-full border-collapse border border-border text-sm" 
        {...props} 
      />
    </div>
  ),
  th: (props) => (
    <th 
      className="border border-border p-3 bg-neutral-950 font-semibold text-left text-foreground uppercase tracking-wider text-xs" 
      {...props} 
    />
  ),
  td: (props) => (
    <td 
      className="border border-border p-3 text-muted-foreground leading-relaxed" 
      {...props} 
    />
  ),
  code: (props) => (
    <code 
      className="font-mono bg-neutral-900 border border-border px-1.5 py-0.5 rounded text-xs text-[#e2e8f0]" 
      {...props} 
    />
  ),
  a: (props) => {
    const isExternal = props.href?.startsWith('http')
    return (
      <a 
        className="text-white underline hover:opacity-80 transition-opacity font-medium" 
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props} 
      />
    )
  },
  hr: (props) => (
    <hr 
      className="border-border my-12" 
      {...props} 
    />
  ),
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: 'subtle-anchor',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: true,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
        },
      ],
    ],
  },
}

export default function MDXRenderer({ source }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} options={options} components={components} />
    </div>
  )
}
