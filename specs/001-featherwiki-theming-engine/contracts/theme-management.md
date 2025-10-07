# Theme Management Contracts

## Theme Application Contract

**Function**: `applyActiveTheme(state)`

**Purpose**: Dynamically applies the active theme's CSS variables to the document

**Input**:
- `state`: FeatherWiki state object containing `state.p.activeTheme` and `state.p.themes`

**Behavior**:
1. Check `state.p.activeTheme`
2. If not "default", retrieve theme from `state.p.themes[state.p.activeTheme]`
3. Remove existing `<style id="fw-theme">` element if present
4. Create new `<style id="fw-theme">` element with `:root` block containing theme variables
5. Inject style element into document `<head>`

**Output**: None (DOM manipulation)

**Error Handling**: Graceful fallback to default styling if theme not found or invalid

## Theme State Management Contract

**Function**: Theme state modifications

**Purpose**: Manage theme data within state.p object

**Operations**:

### Create Theme
- **Input**: Theme name (string), CSS variables (object)
- **Action**: Add theme to `state.p.themes[name]`
- **Validation**: Theme name must be valid CSS identifier format, not "default", maximum 10 themes
- **Event**: Emit `events.CHECK_CHANGED`

### Update Theme
- **Input**: Theme name (string), updated CSS variables (object)
- **Action**: Modify `state.p.themes[name]`
- **Validation**: Theme must exist
- **Event**: Emit `events.CHECK_CHANGED`

### Delete Theme
- **Input**: Theme name (string)
- **Action**: Remove `state.p.themes[name]`
- **Validation**: Theme must exist, cannot delete if currently active (require new active theme selection first)
- **Event**: Emit `events.CHECK_CHANGED`

### Set Active Theme
- **Input**: Theme name (string)
- **Action**: Set `state.p.activeTheme = name`
- **Validation**: Theme must exist or be "default"
- **Event**: Emit `events.CHECK_CHANGED`, call `applyActiveTheme(state)`

## UI Interaction Contract

**Component**: Theming section in settings view

**Elements**:
- Active theme dropdown (`<select>`)
- Theme management controls (create, edit, delete buttons)
- Theme editor textarea (`<textarea>`)

**Event Handlers**:
- Dropdown change → Set active theme
- Create button → Add new theme
- Edit button → Load theme into editor
- Save button → Update theme
- Delete button → Remove theme

**Validation**:
- Theme names must be valid CSS identifier format (letters, numbers, hyphens, underscores)
- CSS variables must be valid CSS syntax (reject entire save on invalid syntax)
- Cannot delete active theme (require new active theme selection first)
- Maximum 10 themes per wiki

**Internationalization**:
- All UI text uses translation keys from `locales/en-US.json`
- Format: `{{translate:keyName}}`

## Data Persistence Contract

**Save Operation**:
- Theme data included in standard wiki save
- `state.p.themes` and `state.p.activeTheme` serialized to JSON
- No additional save mechanisms required

**Load Operation**:
- Theme data loaded from saved wiki file
- Missing theme data defaults to `themes: {}` and `activeTheme: "default"`
- Invalid theme references fall back to "default"

**Backward Compatibility**:
- Older FeatherWiki files without theme data load successfully
- Default styling applied when no custom themes available
- No migration or conversion required
