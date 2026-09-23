/**
 * Renders the home page to static HTML after `vite build`, so the content,
 * headings and hero image are in the HTML before JavaScript loads.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing <!--app-html--> placeholder in dist/index.html')

fs.writeFileSync(path.join(dist, 'index.html'), template.replace('<!--app-html-->', render()))
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('Prerendered dist/index.html')

const { siteUrl } = await import(pathToFileURL(path.join(root, 'seo.config.js')).href)
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
  )
  fs.appendFileSync(path.join(dist, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`)
  console.log(`Wrote sitemap.xml for ${siteUrl}`)
}
