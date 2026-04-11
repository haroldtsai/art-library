## ADDED Requirements

### Requirement: Centralised filter configuration
A file `src/config/filters.ts` SHALL define the filterable dimensions for each category. The shape SHALL be:

```typescript
type FilterConfig = {
  [category: string]: {
    tabs?: string[]      // frontmatter fields rendered as tab bars
    pills?: string[]     // frontmatter fields rendered as pill filters
    sort?: string[]      // frontmatter fields available as sort keys
  }
}
```

Adding a new filterable field or category to this config SHALL not require any component changes.

#### Scenario: New filter dimension added
- **WHEN** a new field is added to a category entry in `filters.ts`
- **THEN** the filter UI for that category automatically includes the new dimension on next build

#### Scenario: Category with no config entry
- **WHEN** a category has no entry in `filters.ts`
- **THEN** default behaviour applies: no tag filters shown, sort by Date Added only

### Requirement: Default filter configuration
The initial `filters.ts` SHALL include entries for all v1 categories:

| Category | Tabs | Pills | Sort |
|----------|------|-------|------|
| vinyl | genre, decade | tags | year, artist, dateAdded |
| cd | genre, decade | tags | year, artist, dateAdded |
| painting | — | tags, medium | year, dateAdded |
| sculpture | — | tags, medium | year, dateAdded |
| furniture | — | tags | year, dateAdded |
| my-works | — | tags, medium | year, dateAdded |

#### Scenario: Vinyl filter tabs render
- **WHEN** user visits `/vinyl`
- **THEN** genre and decade tab bars are rendered using values derived from item frontmatter

### Requirement: Filter values derived from content
Filter option values (e.g. the list of genres to show as tabs) SHALL be derived at build time from the actual frontmatter values present in `/content/`, not hardcoded. Only values that appear in at least one item are shown.

#### Scenario: Genre tab values from content
- **WHEN** vinyl items have `genre: Jazz` and `genre: Rock` in their frontmatter
- **THEN** only "Jazz" and "Rock" appear as genre tabs; no empty options shown
