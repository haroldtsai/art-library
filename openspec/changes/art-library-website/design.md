## Context

Greenfield personal art collection website. The owner has ~200+ items across vinyl, CD, paintings, sculpture, designer furniture, and original artworks. Content volume is 100–500 items (vinyl/CD heavy). The site is public and shareable. The owner has engineering experience but prefers low-maintenance operations: no database to manage, no CMS to update, no server to babysit.

Visual direction: warm off-white/gray (#f2ede8 base), Bauhaus × editorial fusion — geometric grid structure, italic serif titles (Georgia), uppercase sans-serif labels, desaturated photography, paper-texture noise overlay.

## Goals / Non-Goals

**Goals:**
- Markdown files in git are the single source of truth for all content
- Adding a new artwork = create one `.md` file + push; site updates within ~1 minute
- New categories are auto-discovered — no config change required
- Filter/sort dimensions are centralised in one config file
- Images served via Cloudflare R2 + CDN; Next.js `<Image>` handles responsive sizing
- Featured items controlled by a single frontmatter flag (`featured: true`)
- Deployed on Vercel; zero ops after initial setup

**Non-Goals:**
- No CMS web UI (owner is comfortable with a text editor and git)
- No user accounts, comments, or social features
- No server-side search (client-side is sufficient at this scale)
- No e-commerce or inquiry forms
- No i18n (Chinese + English mixed content is fine as-is)

## Decisions

### D1: Next.js App Router over Astro

**Decision:** Use Next.js 14+ App Router.

**Rationale:** Astro would produce a marginally faster static site, but Next.js gives ISR (Incremental Static Regeneration), easy API routes for future needs, and is the most maintainable long-term given the owner's background. Vercel's native support means zero deployment config.

**Alternative considered:** Astro — rejected because adding any dynamic feature later (e.g., search API, admin endpoint) requires migrating off the framework.

### D2: Markdown files as content store, no database

**Decision:** All artwork data lives in `/content/<category>/<slug>.md` files with YAML frontmatter. No SQLite, no Postgres, no Contentlayer.

**Rationale:** Git is the version history. The content fits entirely in memory at build time. `gray-matter` parses frontmatter in ~1ms per file. At 500 files this is negligible. No database means no migrations, no backup strategy, no connection pooling.

**Alternative considered:** SQLite via Turso — rejected because it adds infrastructure (remote DB), a migration story, and a new dependency for no meaningful gain at this scale.

### D3: Cloudflare R2 for images

**Decision:** Images are uploaded manually to R2; URLs are written into frontmatter (`image: https://...`).

**Rationale:** R2 has no egress fees (unlike S3), 10 GB free, and integrates trivially with Next.js `<Image>` by adding the R2 domain to `next.config.js` remotePatterns. The upload workflow (drag to R2 dashboard → copy URL → paste into `.md`) is fast and requires no tooling.

**Alternative considered:** Git LFS — rejected due to bandwidth limits and poor DX. Cloudinary — good but more expensive at scale and adds a vendor dependency.

### D4: Client-side filtering, no search backend

**Decision:** All filtering (category tabs, tag pills, text search) runs client-side in the browser. The full collection JSON is fetched once and filtered in memory.

**Rationale:** At 500 items, the collection JSON is ~100–200 KB. This is trivially fast to filter client-side. No Algolia, no API route, no complexity.

**Alternative considered:** Route-based filtering with server components — rejected because it requires a round-trip per filter change and adds complexity with no UX benefit at this scale.

### D5: Extensible filter config

**Decision:** `src/config/filters.ts` defines which frontmatter fields are filterable per category, and how they render (tab, pill, range). Adding a new filter dimension = one entry in this file, zero component changes.

```typescript
// Example shape
export const filterConfig: FilterConfig = {
  vinyl: {
    tabs: ['genre', 'decade'],
    pills: ['tags'],
    sort: ['year', 'artist', 'dateAdded'],
  },
  painting: {
    tabs: [],
    pills: ['tags', 'medium'],
    sort: ['year', 'dateAdded'],
  },
}
```

### D6: Category auto-discovery

**Decision:** Categories are inferred at build time by scanning `/content/` subdirectories. No explicit category registry.

**Rationale:** The owner explicitly wants to add categories later without touching code. A `fs.readdirSync('/content')` at build time gives the full list.

## Risks / Trade-offs

- **Build time grows with content** → At 500 MD files with Next.js ISR this is <10s; revalidation can be set to `false` (static) or a short TTL per route. Low risk.
- **No inline image upload** → Owner must upload to R2 separately before writing the MD file. This is a workflow friction point. Mitigation: document a clear naming convention (`/collection/<category>/<slug>-01.jpg`) and keep the R2 dashboard bookmarked.
- **Client-side filter bundle** → The full collection JSON is loaded on the collection page. At 500 items × ~500B per item = ~250 KB uncompressed, ~50 KB gzipped. Acceptable. If the collection grows to 2000+ items, pagination or server-side filtering becomes necessary.
- **No rich text editor** → Owner writes Markdown by hand. Mitigation: provide a well-documented frontmatter template and example files in the repo.

## Migration Plan

1. Set up Vercel project + connect GitHub repo (one-time, ~10 min)
2. Create Cloudflare R2 bucket, configure `next.config.js` remotePatterns
3. Seed `/content/` with a handful of real items to validate the pipeline
4. Deploy; verify ISR and image delivery
5. Ongoing: `git push` to add content; Vercel redeploys automatically

No rollback strategy needed — this is a new site with no existing users.

## Open Questions

- **Custom domain**: Does the owner want a custom domain at launch, or `*.vercel.app` is fine initially?
- **About page**: Content TBD — owner can add later as `content/pages/about.md` with no code change if we treat it as a special static page.
