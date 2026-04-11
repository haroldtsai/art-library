## Why

The owner has an extensive personal art collection—vinyl records, CDs, oil paintings, sculptures, designer furniture, and original artworks—with no dedicated place to document and share it. A purpose-built collection website allows curated presentation of each piece with photos, personal notes, acquisition context, and external references, shareable with friends or the public.

## What Changes

- New public-facing website built with Next.js App Router, deployed on Vercel
- Markdown-file-based content management: each artwork is a `.md` file in a `/content/<category>/` folder
- Images stored on Cloudflare R2 (CDN-delivered, referenced by URL in frontmatter)
- Featured works system: items marked `featured: true` surface prominently on home and collection pages
- Category-aware grid layout: 2-column for paintings/sculpture/furniture, 4-column dense for vinyl/CD
- Client-side search and tag-based filtering, driven by a `filter.config.ts` config file (extensible without code changes)
- Item detail pages with: hero image, metadata sidebar, personal notes (Markdown body), tags, external reference links, thumbnail gallery, related items

## Capabilities

### New Capabilities

- `content-management`: Markdown + frontmatter schema for all artwork types; folder structure defines categories; git is the content store
- `home-page`: Featured works hero strip, category shortcuts, recent additions grid, vinyl/CD preview strip
- `collection-listing`: Filterable, sortable full-collection view with Featured section, 2-col art grid, 4-col vinyl/CD grid
- `category-page`: Per-category listing with tag filters and sort controls; new categories auto-discovered from `/content/` folders
- `item-detail`: Single artwork page — hero image, metadata, Markdown notes, tags, external refs, thumbnail gallery, related items
- `image-pipeline`: Cloudflare R2 storage + CDN delivery; Next.js Image optimisation for responsive sizes
- `filter-config`: Centralised `filter.config.ts` defining filterable dimensions per category; adding a new filter requires no component changes

### Modified Capabilities

*(None — this is a greenfield project)*

## Impact

- **New dependencies**: Next.js 14+, Tailwind CSS (utility layer only), `gray-matter` (frontmatter parsing), `next/image`, Cloudflare R2 SDK
- **Infrastructure**: Vercel project (free tier initially), Cloudflare R2 bucket, custom domain (optional)
- **No existing code affected** — greenfield repository
