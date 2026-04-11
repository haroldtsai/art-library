## 1. Project Scaffold & Infrastructure

- [x] 1.1 Initialise Next.js 14 App Router project (`npx create-next-app@latest`)
- [x] 1.2 Install dependencies: `gray-matter`, `next-mdx-remote` (for Markdown rendering), Tailwind CSS
- [x] 1.3 Configure `next.config.js`: add Cloudflare R2 domain to `images.remotePatterns`
- [ ] 1.4 Set up Vercel project, connect GitHub repo, confirm auto-deploy on push
- [ ] 1.5 Create Cloudflare R2 bucket, enable public access, note the public base URL
- [x] 1.6 Add `.gitignore` entries: `.next/`, `node_modules/`, `.env.local`
- [x] 1.7 Create `/content/` directory with placeholder category folders: `vinyl/`, `cd/`, `painting/`, `sculpture/`, `furniture/`, `my-works/`
- [x] 1.8 Seed 2–3 real items per category as `.md` files to validate the pipeline end-to-end

## 2. Content Layer

- [x] 2.1 Create `src/lib/content.ts`: `getAllItems()`, `getItemsByCategory()`, `getItem(category, slug)`, `getAllCategories()` — all using `gray-matter` + `fs.readdirSync`
- [x] 2.2 Create `src/lib/types.ts`: `ArtworkItem` type matching the full frontmatter schema
- [x] 2.3 Create `src/config/filters.ts`: initial `FilterConfig` for all 6 v1 categories (tabs, pills, sort fields)
- [x] 2.4 Write unit tests for `content.ts` (missing fields, empty body, empty category folder)

## 3. Visual Foundation

- [x] 3.1 Configure Tailwind with custom colour tokens: `--bg`, `--bg2`, `--bg3`, `--rule`, `--text`, `--muted`, `--accent`
- [x] 3.2 Create global CSS: paper-texture noise overlay, base typography (Georgia serif + Helvetica Neue sans), scrollbar styling
- [x] 3.3 Build `<Nav>` component: logo (links home), category nav links (auto-generated from `getAllCategories()`), item count
- [x] 3.4 Build `<Footer>` component
- [x] 3.5 Build `<Breadcrumb>` component: accepts `[{label, href}]` array
- [x] 3.6 Build `<ArtCard>` component: 2-col variant (large image, serif italic title, metadata sub)
- [x] 3.7 Build `<VinylCard>` component: 4-col compact variant
- [x] 3.8 Build `<FeaturedStrip>` component: large hero slot (left) + 2-item sidebar (right), accepts up to 3 featured items

## 4. Home Page

- [x] 4.1 Create `src/app/page.tsx` (home page)
- [x] 4.2 Implement Featured Works section using `<FeaturedStrip>` — items filtered by `featured: true`, sorted by `dateAdded` desc
- [x] 4.3 Implement Category Shortcuts grid — auto-generated from `getAllCategories()` with item counts
- [x] 4.4 Implement Recent Additions 2-column grid — latest 4 non-vinyl/CD items
- [x] 4.5 Implement Vinyl & CD preview strip — latest 4 vinyl/CD items in `<VinylCard>` 4-column layout

## 5. Collection Page

- [x] 5.1 Create `src/app/collection/page.tsx`
- [x] 5.2 Add `<FilterTabs>` component: "All" + one tab per category with counts; updates URL search params
- [x] 5.3 Implement adaptive grid: art items in 2-col `<ArtCard>` grid, vinyl/CD in separate 4-col `<VinylCard>` grid
- [x] 5.4 Implement sort controls (Year ↑/↓, Name A–Z, Date Added) — client-side state
- [x] 5.5 Add `<FeaturedStrip>` at top of collection page (same data as home)

## 6. Category Page

- [x] 6.1 Create `src/app/[category]/page.tsx` with `generateStaticParams()` from `getAllCategories()`
- [x] 6.2 Implement tag pill filter bar — values derived from items' tags, config from `filters.ts`
- [x] 6.3 Implement multi-select AND logic for tag filters — URL search params for shareable filter state
- [x] 6.4 Implement sort controls (same as collection page)
- [x] 6.5 Render 404 for unknown category slugs
- [x] 6.6 Add breadcrumb: Home · Category Name

## 7. Item Detail Page

- [x] 7.1 Create `src/app/[category]/[slug]/page.tsx` with `generateStaticParams()`
- [x] 7.2 Render hero image using `next/image`, full-width, max-height 520px, with caption overlay
- [x] 7.3 Implement 2-column body layout: main content (left) + metadata sidebar (right)
- [x] 7.4 Render Markdown body as HTML using `next-mdx-remote` (or `remark` + `rehype`)
- [x] 7.5 Render metadata sidebar: omit absent optional fields, no empty rows
- [x] 7.6 Render tags as pills; clicking a tag navigates to `/<category>?tag=<tag>`
- [x] 7.7 Render external references as `→ <label>` links (target blank, rel noopener)
- [x] 7.8 Implement thumbnail gallery in sidebar; clicking replaces hero image (client-side state)
- [x] 7.9 Implement Related Works section — up to 4 items from same category, excluding current
- [x] 7.10 Add breadcrumb: Home · Category · Title
- [x] 7.11 Render 404 for unknown slugs

## 8. Image Pipeline

- [x] 8.1 Document R2 upload workflow and naming convention in `README.md`
- [x] 8.2 Verify `next/image` renders R2 images in WebP/AVIF with correct `srcset`
- [x] 8.3 Implement placeholder fallback for missing/broken image URLs

## 9. Filter Config

- [x] 9.1 Wire `filters.ts` into category page: derive tab values from actual frontmatter at build time
- [x] 9.2 Wire `filters.ts` into collection page filter tabs
- [x] 9.3 Verify adding a new entry to `filters.ts` renders new filter without component changes

## 10. Polish & Launch

- [x] 10.1 Add `<meta>` tags: title, description, og:image per page (use `image` frontmatter for item pages)
- [ ] 10.2 Verify mobile layout (nav collapses, grids reflow to 1-col on small screens)
- [ ] 10.3 Run Lighthouse audit; confirm Performance ≥ 90, Accessibility ≥ 90
- [x] 10.4 Add `.superpowers/` to `.gitignore`
- [ ] 10.5 Seed repository with 10+ real items across categories
- [ ] 10.6 Confirm Vercel deployment on push to `main`
- [ ] 10.7 (Optional) Configure custom domain in Vercel dashboard
