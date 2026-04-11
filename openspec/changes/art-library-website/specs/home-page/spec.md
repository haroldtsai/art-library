## ADDED Requirements

### Requirement: Featured works strip
The home page SHALL display a Featured Works section at the top. The primary featured item SHALL occupy a large hero slot (left, ~60% width). Up to two additional featured items SHALL appear in a sidebar (right, ~40% width, stacked vertically). Items are selected by `featured: true` in frontmatter, ordered by `dateAdded` descending.

#### Scenario: Three or more featured items exist
- **WHEN** three or more items have `featured: true`
- **THEN** the most recently added item appears as the large hero; the next two appear in the sidebar

#### Scenario: Fewer than three featured items
- **WHEN** only one or two items have `featured: true`
- **THEN** the available items fill the slots; empty sidebar slots are hidden

#### Scenario: No featured items
- **WHEN** no items have `featured: true`
- **THEN** the Featured Works section SHALL be hidden entirely

### Requirement: Category shortcuts
Below the featured strip, the home page SHALL display a category grid showing all auto-discovered categories with their item count. Clicking a category navigates to the category listing page.

#### Scenario: Category grid rendered
- **WHEN** the home page loads
- **THEN** one tile per category is shown, each displaying category name and item count

### Requirement: Recent additions grid
Below the category shortcuts, the home page SHALL display a 2-column grid of the most recently added non-vinyl/CD items (by `dateAdded`), up to 4 items.

#### Scenario: Recent items shown
- **WHEN** items with `dateAdded` exist
- **THEN** up to 4 most recent non-music items appear in the 2-column grid

### Requirement: Vinyl & CD preview strip
At the bottom of the home page, the home page SHALL display a 4-column strip of the most recently added vinyl or CD items, up to 4 items, with a "View All" link to the vinyl category page.

#### Scenario: Vinyl strip rendered
- **WHEN** vinyl or CD items exist
- **THEN** up to 4 items appear in the strip in 4-column layout
