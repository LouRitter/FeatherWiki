# Data Model: FeatherWiki Theming Engine

## Core Entities

### Theme
**Purpose**: Represents a collection of CSS variable definitions that define the visual appearance of the wiki.

**Structure**:
```javascript
{
  "themeName": {
    "--bg-primary": "#ffffff",
    "--text-main": "#000000",
    "--accent-color": "#007acc",
    "--border-color": "#e0e0e0"
    // ... additional CSS variables
  }
}
```

**Validation Rules**:
- Theme name must be a valid CSS identifier format (letters, numbers, hyphens, underscores)
- CSS variable names must start with `--` (CSS Custom Property format)
- CSS variable values must be valid CSS values
- Theme name cannot be "default" (reserved for fallback)
- Maximum 10 themes per wiki instance

**State Transitions**:
- Created: New theme added to themes collection
- Updated: CSS variables modified within existing theme
- Deleted: Theme removed from themes collection
- Applied: Theme becomes the active theme

### Active Theme
**Purpose**: Tracks the currently selected theme that determines the wiki's visual appearance.

**Structure**:
```javascript
"activeTheme": "themeName" // String reference to theme name
```

**Validation Rules**:
- Must be a string
- Must reference an existing theme name or be "default"
- Cannot be null or undefined

**State Transitions**:
- Changed: User selects different theme from dropdown
- Applied: Theme styles are injected into document head
- Fallback: Invalid theme reference defaults to "default"

### Theme Collection
**Purpose**: Data structure containing all available themes, organized by theme name for easy lookup and management.

**Structure**:
```javascript
"themes": {
  "dark_mode": {
    "--bg-primary": "#121212",
    "--text-main": "#ffffff"
  },
  "high_contrast": {
    "--bg-primary": "#000000",
    "--text-main": "#ffffff",
    "--accent-color": "#ffff00"
  }
  // ... additional themes
}
```

**Validation Rules**:
- Must be an object
- Keys must be valid theme names (CSS identifier format, not "default")
- Values must be valid theme objects
- Empty object is valid (no custom themes)
- Maximum 10 themes per collection

**State Transitions**:
- Theme Added: New theme object added to collection
- Theme Modified: Existing theme object updated
- Theme Removed: Theme object deleted from collection
- Collection Cleared: All themes removed (returns to empty object)

## State Integration

### Core State Object (state.p) Extensions
The theming system extends the existing `state.p` object with two new keys:

```javascript
state.p = {
  // ... existing wiki data
  themes: {},           // Theme collection
  activeTheme: "default" // Currently active theme
}
```

### Backward Compatibility
- Existing FeatherWiki files without theme data will initialize with default values
- Missing `themes` key defaults to empty object `{}`
- Missing `activeTheme` key defaults to `"default"`
- Invalid theme references fall back to `"default"`

### Data Persistence
- Theme data is included in the standard save/load cycle
- All theme data is serialized to JSON within the HTML file
- Theme data survives file transfers and server saves
- No external dependencies or storage mechanisms required

## CSS Variable Mapping

### Standard Theme Variables
The following CSS variables will be defined in the refactored `index.css`:

**Colors**:
- `--bg-primary`: Primary background color
- `--bg-secondary`: Secondary background color
- `--text-main`: Main text color
- `--text-secondary`: Secondary text color
- `--accent-color`: Accent/highlight color
- `--border-color`: Border color

**Typography**:
- `--font-family`: Font family
- `--font-size-base`: Base font size
- `--font-size-small`: Small font size
- `--font-size-large`: Large font size

**Spacing**:
- `--spacing-small`: Small spacing unit
- `--spacing-medium`: Medium spacing unit
- `--spacing-large`: Large spacing unit

**Layout**:
- `--border-radius`: Border radius
- `--shadow`: Box shadow
- `--transition`: Transition duration

### Fallback Values
Each CSS variable includes a fallback value to ensure functionality even when theme data is missing:

```css
background: var(--bg-primary, #ffffff);
color: var(--text-main, #000000);
border: 1px solid var(--border-color, #e0e0e0);
```
