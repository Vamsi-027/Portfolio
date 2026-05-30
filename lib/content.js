import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// Generic frontmatter parser supporting arrays, strings, and types
export function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: fileContent }
  }

  const yamlText = match[1]
  const content = match[2]
  const data = {}

  const lines = yamlText.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim()
    let val = trimmed.slice(colonIdx + 1).trim()

    if (!key) continue

    // Parse value types
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    } else if (val === 'true') {
      val = true
    } else if (val === 'false') {
      val = false
    } else if (!isNaN(val) && val !== '') {
      val = Number(val)
    } else if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',')
        .map(v => {
          v = v.trim()
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            return v.slice(1, -1)
          }
          return v
        })
        .filter(Boolean)
    }

    data[key] = val
  }

  return { data, content }
}

// Calculate reading time roughly based on word count
function calculateReadingTime(content) {
  const wordsPerMinute = 225
  const cleanContent = content.replace(/[#*`\[\]()\-]/g, '')
  const words = cleanContent.split(/\s+/).filter(w => w.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

// Recursively traverse a directory to find all markdown/mdx files
function readFilesRecursively(dirPath, baseDir = dirPath) {
  let results = []
  if (!fs.existsSync(dirPath)) return results

  const list = fs.readdirSync(dirPath)
  list.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    if (stat && stat.isDirectory()) {
      results = results.concat(readFilesRecursively(filePath, baseDir))
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const relativePath = path.relative(baseDir, filePath)
      results.push({
        filePath,
        relativePath,
        filename: file
      })
    }
  })

  return results
}

// Public API for unified content fetching
export function getAllContent(type) {
  const typeDir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(typeDir)) {
    fs.mkdirSync(typeDir, { recursive: true })
    return []
  }

  const files = readFilesRecursively(typeDir)
  const items = files.map(fileInfo => {
    const fileContent = fs.readFileSync(fileInfo.filePath, 'utf8')
    const { data, content } = parseFrontmatter(fileContent)

    // Dynamic slug construction
    // For notes in folders (e.g. notes/attention/qkv.mdx):
    // slug = qkv, category = attention
    const parsedPath = path.parse(fileInfo.relativePath)
    const slug = parsedPath.name
    const category = parsedPath.dir || data.category || 'general'
    
    const relativeDate = data.date || new Date().toISOString().split('T')[0]
    const readingTime = data.readingTime || calculateReadingTime(content)

    return {
      slug,
      category,
      content,
      ...data,
      date: relativeDate,
      readingTime,
      type
    }
  })
  
  // Sort descending by date
  return items.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getContentBySlug(type, slug, category = '') {
  const items = getAllContent(type)
  
  if (type === 'notes' && category) {
    return items.find(item => item.slug === slug && item.category === category) || null
  }
  
  return items.find(item => item.slug === slug) || null
}

// Simplified Dashboard Metrics
export function getDashboardMetrics() {
  const articles = getAllContent('articles')
  const notes = getAllContent('notes')
  const resources = getAllContent('resources')
  
  // Repositories studied - static whitelist as required
  const reposCount = 5

  // Find the latest updated date
  const allDates = [...articles, ...notes, ...resources].map(i => new Date(i.date))
  const latestDate = allDates.length > 0
    ? new Date(Math.max(...allDates)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'May 2026'

  return {
    resourcesCount: resources.length || 4,
    articlesCount: articles.length || 5,
    notesCount: notes.length || 9,
    reposCount,
    currentFocus: 'Transformer Internals, GPT Architecture, Tokenization Systems',
    lastUpdated: latestDate
  }
}
