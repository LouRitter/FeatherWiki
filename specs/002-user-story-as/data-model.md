# Data Model: Enhanced Theming System with Color Pickers

## Core Entities

### Enhanced Theme
**Purpose**: Represents a comprehensive collection of CSS variable definitions that define the visual appearance of all UI elements in the wiki.

**Structure**:
```javascript
{
  "themeName": {
    "--bg-primary": "#ffffff",
    "--text-main": "#000000",
    "--accent-color": "#007acc",
    "--sidebar-bg": "#f0f0f0",
    "--button-bg-active": "#87C",
    "--text-active": "#ffffff",
    "--accent-danger-bg": "#ff4444",
    "--code-block-bg": "#f8f8f8"
    // ... additional CSS variables for comprehensive theming
  }
}
```

**Validation Rules**:
- Theme name must be a valid CSS identifier format (letters, numbers, hyphens, underscores)
- CSS variable names must start with `--` (CSS Custom Property format)
- CSS variable values must be valid CSS color values
- Theme name cannot be "default" (reserved for fallback)
- Maximum 10 themes per wiki instance

**State Transitions**:
- Created: New theme added to themes collection with color picker interface
- Updated: CSS variables modified through color picker interactions
- Deleted: Theme removed from themes collection
- Applied: Theme becomes the active theme with live preview

### Color Picker Configuration
**Purpose**: Defines the mapping between UI elements and their corresponding CSS variables for the color picker interface.

**Structure**:
```javascript
const themeVariableMap = {
  '--bg-primary': 'themePrimaryBg',
  '--text-main': 'themeTextMain',
  '--accent-color': 'themeAccent',
  '--sidebar-bg': 'themeSidebarBg',
  '--button-bg-active': 'themeActiveElementBg',
  '--text-active': 'themeActiveText',
  '--accent-danger-bg': 'themeDangerBg',
  '--code-block-bg': 'themeCodeBg'
}
```

**Validation Rules**:
- Each CSS variable must have a corresponding translation key
- Translation keys must be defined in locales/en-US.json
- CSS variables must be valid CSS Custom Property names
- Mapping must be bidirectional (variable to label and label to variable)

**State Transitions**:
- Configured: Color picker mapping established
- Updated: New UI elements added to theming system
- Validated: Translation keys verified and available

### Live Preview State
**Purpose**: Tracks real-time color changes during theme editing without requiring save operations.

**Structure**:
```javascript
{
  editingTheme: "themeName",           // Currently selected theme for editing
  previewMode: true,                   // Whether live preview is active
  unsavedChanges: false,               // Whether changes need to be saved
  lastAppliedTheme: "themeName"        // Last theme that was applied for preview
}
```

**Validation Rules**:
- Editing theme must exist in themes collection or be "new"
- Preview mode must be boolean
- Unsaved changes flag must be boolean
- Last applied theme must be valid theme name

**State Transitions**:
- Started: User begins editing a theme
- Updated: Color changes made through pickers
- Applied: Changes applied to active theme for live preview
- Saved: Changes committed to theme data structure

## State Integration

### Enhanced State Object Extensions
The enhanced theming system extends the existing `state.p` object with additional theme management capabilities:

```javascript
state.p = {
  // ... existing wiki data
  themes: {},                    // Enhanced theme collection
  activeTheme: "default",        // Currently active theme
  themeEditing: {                // Live preview state
    editingTheme: null,
    previewMode: false,
    unsavedChanges: false
  }
}
```

### Backward Compatibility
- Existing themes created with textarea interface remain fully functional
- Missing CSS variables in existing themes default to fallback values
- Color picker interface gracefully handles themes with incomplete variable sets
- No migration required for existing theme data

### Data Persistence
- Enhanced theme data is included in the standard save/load cycle
- Live preview state is not persisted (reset on page load)
- All theme data is serialized to JSON within the HTML file
- Theme data survives file transfers and server saves

## CSS Variable Mapping

### Comprehensive Theme Variables
The following CSS variables will be defined in the enhanced `index.css`:

**Core Colors**:
- `--bg-primary`: Primary background color
- `--bg-secondary`: Secondary background color
- `--bg-tertiary`: Tertiary background color
- `--text-main`: Main text color
- `--text-secondary`: Secondary text color

**Interactive Elements**:
- `--accent-color`: Primary accent color (links, buttons)
- `--accent-hover`: Hover state for accent elements
- `--button-bg-active`: Active button background
- `--text-active`: Active element text color

**UI Components**:
- `--sidebar-bg`: Sidebar background color
- `--sidebar-text-color`: Sidebar text color
- `--code-block-bg`: Code block background
- `--accent-danger-bg`: Danger/warning element background

**Layout & Effects**:
- `--border-color`: Primary border color
- `--border-light`: Light border color
- `--shadow-color`: Shadow color
- `--outline-color`: Focus outline color

### Fallback Values
Each CSS variable includes a fallback value to ensure functionality even when theme data is missing:

```css
background: var(--sidebar-bg, #f0f0f0);
color: var(--text-main, #000000);
border: 1px solid var(--border-color, #e0e0e0);
```

## Color Picker Interface Model

### Theme Selection Workflow
1. User selects theme from dropdown
2. Color pickers appear for selected theme
3. User modifies colors using pickers
4. Live preview updates in real-time
5. Changes marked for save when picker closed

### Validation & Error Handling
- Invalid colors accepted but warning displayed
- Color picker values validated against CSS color specifications
- Fallback to previous valid color on critical errors
- User-friendly error messages via translation keys
