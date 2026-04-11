## ADDED Requirements

### Requirement: Item detail page layout
Each item SHALL have a detail page at `/<category>/<slug>`. The page layout SHALL be: full-width hero image at top, followed by a two-column body (main content left ~60%, metadata sidebar right ~40%).

#### Scenario: Item page renders
- **WHEN** user navigates to `/<category>/<slug>`
- **THEN** the page displays hero image, title, metadata, notes, tags, and references

#### Scenario: Unknown item
- **WHEN** slug does not correspond to any `.md` file in the category
- **THEN** the page SHALL return a 404

### Requirement: Hero image
The hero image SHALL be the `image` frontmatter field, rendered full-width via `next/image` with appropriate responsive sizes. Max display height is 520px on desktop. The image SHALL include a caption overlay (category and year, bottom-right).

#### Scenario: Hero image displayed
- **WHEN** `image` field is present
- **THEN** image renders full-width above the content body

### Requirement: Metadata sidebar
The right sidebar SHALL display structured metadata fields: artist, label (if present), year, medium/format, size (if present), acquired (if present). Fields absent from frontmatter are omitted.

#### Scenario: Partial metadata
- **WHEN** some metadata fields are absent from frontmatter
- **THEN** those fields are not shown; no empty rows rendered

### Requirement: Personal notes
The Markdown body of the `.md` file SHALL be rendered as HTML in the main content area, below the title and category label. Typography: Georgia serif, 15px, 1.95 line-height, warm gray (#6b6358).

#### Scenario: Notes rendered
- **WHEN** Markdown body is non-empty
- **THEN** rendered HTML appears in the notes section

### Requirement: Tags
If `tags` is present, tag pills SHALL be displayed below the notes. Clicking a tag navigates to the category page with that tag pre-selected.

#### Scenario: Tag click navigates
- **WHEN** user clicks a tag pill on an item detail page
- **THEN** user is taken to `/<category>?tag=<tag>` with the tag filter active

### Requirement: External references
If `refs` is present, a references section SHALL appear below tags, listing each reference as a clickable external link (opens in new tab).

#### Scenario: References rendered
- **WHEN** `refs` array contains entries
- **THEN** each entry renders as `→ <label>` linking to `url`

### Requirement: Thumbnail gallery
If `images` (additional images) is present, a 2×N thumbnail grid SHALL appear in the sidebar below the metadata. Clicking a thumbnail replaces the hero image.

#### Scenario: Thumbnail clicked
- **WHEN** user clicks a thumbnail
- **THEN** the hero image updates to show the selected image without page reload

### Requirement: Related items
Below the item body, a "Related Works" section SHALL display up to 4 items from the same category (excluding current item), in 4-column layout for vinyl/CD or 2-column for others.

#### Scenario: Related items shown
- **WHEN** other items exist in the same category
- **THEN** up to 4 are shown in the related section

#### Scenario: No related items
- **WHEN** the item is the only one in its category
- **THEN** the related section is hidden

### Requirement: Breadcrumb navigation
The item detail page SHALL display a breadcrumb: `Home · <Category> · <Title>`.

#### Scenario: Category breadcrumb navigates
- **WHEN** user clicks the category name in the breadcrumb
- **THEN** user is taken to the category listing page
