## ADDED Requirements

### Requirement: Markdown frontmatter schema
Each artwork SHALL be represented as a single `.md` file under `/content/<category>/<slug>.md`. The YAML frontmatter SHALL support the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Display title |
| `category` | string | yes | Must match the containing folder name |
| `image` | string | yes | Primary image URL (Cloudflare R2) |
| `year` | number | no | Year of creation or release |
| `artist` | string | no | Creator / artist name |
| `label` | string | no | Record label (vinyl/CD) |
| `medium` | string | no | e.g. "Oil on Canvas", "Bronze" |
| `size` | string | no | Dimensions |
| `acquired` | string | no | Acquisition note (e.g. "Sotheby's HK, 1998") |
| `tags` | string[] | no | Free-form tags for filtering |
| `featured` | boolean | no | If true, item appears in Featured sections |
| `images` | string[] | no | Additional image URLs for gallery |
| `refs` | `{label, url}[]` | no | External reference links |
| `dateAdded` | string | no | ISO date, used for "Recent" sort order |

The Markdown body SHALL be treated as the owner's personal notes and rendered as HTML on the item detail page.

#### Scenario: Valid artwork file is parsed
- **WHEN** a `.md` file with valid frontmatter exists in `/content/<category>/`
- **THEN** the site SHALL display it in the appropriate category listing and item detail page

#### Scenario: Missing optional fields
- **WHEN** optional frontmatter fields are absent
- **THEN** the site SHALL render gracefully without errors, omitting those UI sections

#### Scenario: Empty Markdown body
- **WHEN** the `.md` file has no body text
- **THEN** the notes section SHALL be hidden on the item detail page

### Requirement: Category auto-discovery
The site SHALL automatically discover categories by scanning subdirectories of `/content/` at build time. No category registry or config file is required.

#### Scenario: New category folder added
- **WHEN** a new subdirectory is created under `/content/` containing at least one valid `.md` file
- **THEN** after `git push` and Vercel redeploy, the new category SHALL appear in navigation and listing pages

#### Scenario: Empty category folder
- **WHEN** a category folder exists but contains no `.md` files
- **THEN** the category SHALL not appear in navigation

### Requirement: Slug derivation
The URL slug for each item SHALL be derived from the filename (without `.md` extension). Filenames SHALL use kebab-case. The canonical URL SHALL be `/<category>/<slug>`.

#### Scenario: Filename maps to URL
- **WHEN** a file `/content/vinyl/kind-of-blue.md` exists
- **THEN** the item SHALL be accessible at `/vinyl/kind-of-blue`
