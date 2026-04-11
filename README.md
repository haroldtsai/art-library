# The Harold Collection

A personal art collection website. Built with Next.js App Router, Markdown content files, and Cloudflare R2 for images.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm test         # run tests
```

## Adding a New Artwork

1. **Upload the image to Cloudflare R2**
   - Open the R2 dashboard → your bucket
   - Upload file, copy the public URL
   - Recommended naming: `collection/<category>/<slug>-01.jpg`

2. **Create a Markdown file**

   ```
   content/<category>/<slug>.md
   ```

   Example frontmatter:

   ```yaml
   ---
   title: Kind of Blue
   category: vinyl
   artist: Miles Davis
   label: Columbia
   year: 1959
   image: https://<your-r2-domain>/collection/vinyl/kind-of-blue-01.jpg
   tags: [jazz, modal, essential]
   featured: false          # set true to show in Featured strip
   dateAdded: "2024-06-01"  # ISO date, used for "Recent" ordering
   refs:
     - label: AllMusic
       url: https://www.allmusic.com/...
   ---

   Your personal notes in Markdown...
   ```

3. **Push to git** — Vercel auto-deploys within ~1 minute.

## Adding a New Category

Just create a new folder under `content/`:

```
content/prints/   ← new category, auto-discovered
```

No code changes needed. The nav, listing pages, and filters all pick it up automatically.

To add filter options for the new category, edit `src/config/filters.ts`:

```ts
prints: {
  pills: ['tags', 'medium'],
  sort: ['year', 'dateAdded'],
},
```

## Frontmatter Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | Display title |
| `category` | string | ✓ | Must match folder name |
| `image` | string | ✓ | Primary image URL (R2) |
| `year` | number | | Year of creation/release |
| `artist` | string | | Creator name |
| `label` | string | | Record label / manufacturer |
| `medium` | string | | e.g. "Oil on Canvas" |
| `size` | string | | Dimensions |
| `acquired` | string | | Acquisition note |
| `genre` | string | | For vinyl/CD filter tabs |
| `tags` | string[] | | Free-form tags |
| `featured` | boolean | | Show in Featured strip |
| `images` | string[] | | Additional photos |
| `refs` | `{label, url}[]` | | External reference links |
| `dateAdded` | string | | ISO date for sort order |

## Image Storage (Cloudflare R2)

- R2 bucket: configure in Cloudflare dashboard
- Add your R2 public hostname to `next.config.ts` → `images.remotePatterns`
- Upload images manually via R2 dashboard; paste URL into frontmatter
- Free tier: 10 GB storage, no egress fees

## Deploy

1. Push to GitHub
2. Connect repo to Vercel (one-time)
3. Every `git push main` auto-deploys
