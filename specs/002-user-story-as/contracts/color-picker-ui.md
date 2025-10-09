# Color Picker UI Contracts

## Theme Selection Contract

**Function**: Theme selection dropdown interaction

**Purpose**: Allow users to select which theme to edit before showing color pickers

**Input**:
- Available themes from `state.p.themes`
- Currently active theme from `state.p.activeTheme`

**Behavior**:
1. Display dropdown with all available themes plus "Create New Theme" option
2. When theme selected, show color pickers for that theme's properties
3. When "Create New Theme" selected, show theme creation workflow
4. Update `state.p.themeEditing.editingTheme` with selected theme

**Output**: Color picker interface for selected theme

**Error Handling**: Graceful handling of missing or invalid theme data

## Color Picker Generation Contract

**Function**: `renderThemeEditor(selectedTheme)`

**Purpose**: Generate color picker interface for a selected theme

**Input**:
- `selectedTheme`: Theme object from `state.p.themes[themeName]`
- Theme variable mapping configuration

**Behavior**:
1. Iterate over predefined theme variable map
2. Generate `<div>` containing `<label>` and `<input type="color">` for each variable
3. Set color picker value to corresponding theme variable value
4. Bind `oninput` and `onchange` event handlers
5. Use translation keys for label text

**Output**: HTML structure with color pickers for all themeable properties

**Error Handling**: Fallback to default colors for missing theme variables

## Live Preview Contract

**Function**: Color picker `oninput` event handling

**Purpose**: Provide real-time visual feedback as users adjust colors

**Input**:
- Color picker value change
- Selected theme being edited
- Currently active theme

**Behavior**:
1. Update corresponding CSS variable in `state.p.themes[editingTheme]`
2. If editing theme matches active theme, call `applyActiveTheme(state)`
3. Update live preview state to reflect changes
4. Provide immediate visual feedback

**Output**: Real-time theme application and visual updates

**Error Handling**: Graceful fallback if theme application fails

## State Tracking Contract

**Function**: Color picker `onchange` event handling

**Purpose**: Mark wiki as needing save when color picker changes are made

**Input**:
- Color picker value finalization
- Theme editing state

**Behavior**:
1. Emit `events.CHECK_CHANGED` event to mark wiki as modified
2. Update `state.p.themeEditing.unsavedChanges` flag
3. Trigger save button highlighting
4. Update theme data persistence state

**Output**: Save state indication and change tracking

**Error Handling**: Ensure save state is properly tracked even if events fail

## Theme Creation Contract

**Function**: New theme creation workflow

**Purpose**: Allow users to create new themes with color picker interface

**Input**:
- Theme name from user input
- Starting point selection (default, current, neutral)

**Behavior**:
1. Validate theme name using existing validation rules
2. Create new theme object with selected starting point colors
3. Add theme to `state.p.themes` collection
4. Set as editing theme and show color pickers
5. Apply theme if selected as active

**Output**: New theme with color picker interface ready for editing

**Error Handling**: Validation errors with user-friendly messages

## Validation Contract

**Function**: Color picker value validation

**Purpose**: Validate color values and provide user feedback

**Input**:
- Color picker value
- CSS variable name
- Theme context

**Behavior**:
1. Validate color value against CSS color specifications
2. Accept invalid colors but display warning message
3. Provide helpful feedback for color format issues
4. Maintain user workflow continuity

**Output**: Validation result with optional warning message

**Error Handling**: Graceful acceptance of edge case color values
