## ADDED Requirements

### Requirement: Cloudflare R2 image hosting
All artwork images SHALL be stored in a Cloudflare R2 bucket. The R2 bucket SHALL be configured with public access or a custom domain for CDN delivery. Image URLs in frontmatter SHALL point directly to R2.

#### Scenario: Image renders from R2
- **WHEN** frontmatter `image` contains an R2 URL
- **THEN** the image renders correctly on all pages via Next.js `<Image>`

### Requirement: Next.js Image optimisation
All images SHALL be rendered using `next/image` for automatic format conversion (WebP/AVIF), responsive `srcset` generation, and lazy loading. The R2 domain SHALL be listed in `next.config.js` under `images.remotePatterns`.

#### Scenario: Image is optimised
- **WHEN** any page renders an artwork image
- **THEN** the browser receives a WebP or AVIF version sized to the display context

#### Scenario: Missing image URL
- **WHEN** frontmatter `image` field is absent or the URL is unreachable
- **THEN** a neutral placeholder is shown; no uncaught error is thrown

### Requirement: Manual upload workflow
Image upload SHALL be a manual process: the owner uploads files to the R2 dashboard, copies the public URL, and pastes it into the frontmatter. No automated upload tooling is required at v1.

#### Scenario: Upload naming convention
- **WHEN** owner uploads an image
- **THEN** the recommended path is `/collection/<category>/<slug>-01.jpg` (documented in repo README)
