## ADDED Requirements

### Requirement: Featured section at top of collection
The `/collection` page SHALL display a Featured Works strip identical in structure to the home page featured strip, showing up to 3 featured items.

#### Scenario: Featured strip shown
- **WHEN** the collection page loads and featured items exist
- **THEN** the featured strip appears above the main grid

### Requirement: Category filter tabs
The collection page SHALL display a horizontal filter tab bar listing "All" plus each category. The active tab filters the displayed items. Tab labels include item counts.

#### Scenario: All tab selected (default)
- **WHEN** the page loads
- **THEN** all items are shown; "All" tab is active

#### Scenario: Category tab selected
- **WHEN** user clicks a category tab
- **THEN** only items of that category are displayed; URL updates to reflect filter state

### Requirement: Adaptive grid density
The main item grid SHALL use different column counts depending on category:
- Vinyl and CD items: 4-column grid
- All other categories: 2-column grid
- When "All" tab is active, vinyl/CD items appear in a separate 4-column section below the 2-column art grid

#### Scenario: Mixed view — All tab active
- **WHEN** "All" tab is active
- **THEN** art/sculpture/furniture items appear in 2-column grid; vinyl/CD items appear in a 4-column section labelled "Vinyl & CD"

#### Scenario: Vinyl tab active
- **WHEN** "Vinyl" or "CD" tab is active
- **THEN** all displayed items use 4-column layout

### Requirement: Sort controls
The collection page SHALL provide sort options: by Year (ascending/descending), by Name (A–Z), and by Date Added (newest first). Default sort is Date Added descending.

#### Scenario: Sort by year
- **WHEN** user selects "Year ↑" sort
- **THEN** items reorder from oldest to newest without page reload
