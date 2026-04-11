## ADDED Requirements

### Requirement: Per-category listing page
Each discovered category SHALL have a listing page at `/<category>`. The page SHALL display all items in that category using the appropriate grid density (4-column for vinyl/CD, 2-column for all others).

#### Scenario: Category page renders
- **WHEN** user navigates to `/<category>`
- **THEN** all items in that category are displayed with correct grid density

#### Scenario: Unknown category
- **WHEN** user navigates to a category slug that does not exist in `/content/`
- **THEN** the page SHALL return a 404

### Requirement: Tag filter pills
Category pages SHALL display tag filter pills for all tags present in that category's items (derived from `filter.config.ts`). Selecting a pill filters the grid to matching items. Multiple pills may be selected simultaneously (AND logic).

#### Scenario: Tag filter applied
- **WHEN** user clicks a tag pill (e.g. "Jazz")
- **THEN** only items with that tag are shown; pill appears selected

#### Scenario: Multiple tags selected
- **WHEN** user selects two tag pills
- **THEN** only items matching both tags are shown

#### Scenario: No items match selected tags
- **WHEN** active tag combination matches zero items
- **THEN** an empty state message is shown: "No items match the selected filters"

### Requirement: Sort controls on category page
Category pages SHALL provide the same sort controls as the collection page (Year, Name, Date Added).

#### Scenario: Sort persists within category
- **WHEN** user changes sort order on a category page
- **THEN** items reorder immediately without navigation

### Requirement: Breadcrumb navigation
Category pages SHALL display a breadcrumb: `Home · <Category Name>`.

#### Scenario: Breadcrumb links work
- **WHEN** user clicks "Home" in the breadcrumb
- **THEN** user is navigated to the home page
