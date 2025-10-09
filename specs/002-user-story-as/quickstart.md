# Quickstart: Enhanced Theming System with Color Pickers

## Prerequisites
- FeatherWiki with enhanced theming system implemented
- Modern web browser supporting CSS Custom Properties and HTML color pickers
- Basic understanding of color selection

## Quick Test: Create and Apply a Custom Theme with Color Pickers

### Step 1: Access Enhanced Theme Editor
1. Open your FeatherWiki
2. Navigate to Settings (gear icon)
3. Scroll to the "Theming" section
4. Observe the new color picker interface (no more textarea)

### Step 2: Create a New Theme
1. Click "Create New Theme" button
2. Enter theme name: `custom-dark`
3. Choose starting point: "Default" (starts with system colors)
4. Color pickers will appear for all themeable UI elements

### Step 3: Customize Colors with Pickers
1. Use "Primary Background" color picker to set main background to dark gray
2. Use "Main Text" color picker to set text to light gray
3. Use "Sidebar Background" color picker to set sidebar to darker gray
4. Use "Active Element Background" color picker to set active tabs to blue
5. Observe real-time changes as you adjust each color

### Step 4: Apply and Test Theme
1. Select your custom theme from the "Active Theme" dropdown
2. Navigate through different pages to verify consistent theming
3. Check that sidebar, active tabs, and all UI elements use your custom colors

### Step 5: Verify Persistence
1. Save the wiki (Ctrl+S or Save button)
2. Close and reopen the wiki file
3. Verify your custom theme is still active and applied

## Advanced Usage: Editing Existing Themes

### Step 1: Select Theme for Editing
1. In the theme editor, use the dropdown to select an existing theme
2. Color pickers will populate with the theme's current colors
3. All pickers will show the current values for that theme

### Step 2: Modify Colors
1. Adjust any color using the color pickers
2. See immediate visual feedback as you change colors
3. Changes are applied in real-time if editing the currently active theme

### Step 3: Save Changes
1. Close the color picker to finalize changes
2. Notice the "Save Wiki" button becomes highlighted
3. Save the wiki to persist your theme modifications

## Validation Checklist

### Functional Tests
- [ ] Color picker interface appears in settings
- [ ] Can select theme from dropdown for editing
- [ ] Color pickers show current theme values
- [ ] Real-time preview works when editing active theme
- [ ] Changes are marked for save when picker closed
- [ ] Theme persists after save/load cycle
- [ ] Can create new themes with color pickers
- [ ] All UI elements are themeable (sidebar, active states, etc.)
- [ ] Invalid colors show warning but are accepted
- [ ] Translation keys are properly used for all labels

### Visual Tests
- [ ] Sidebar background changes with color picker
- [ ] Active tab background changes with color picker
- [ ] Main background changes with color picker
- [ ] Text colors change appropriately
- [ ] All UI elements respond to theme changes
- [ ] Theme works across all wiki pages
- [ ] Theme works in both edit and view modes

### Compatibility Tests
- [ ] Existing themes created with textarea still work
- [ ] Enhanced themes load without errors
- [ ] Theme data survives file transfers
- [ ] Server save/load preserves enhanced theme data
- [ ] No regressions in existing functionality

## Troubleshooting

### Color Picker Not Appearing
- Check browser console for JavaScript errors
- Verify theme is selected from dropdown
- Ensure theme data exists in state.p.themes

### Live Preview Not Working
- Verify you're editing the currently active theme
- Check that applyActiveTheme function is available
- Ensure CSS variables are properly defined

### Changes Not Persisting
- Verify wiki was saved after making changes
- Check that CHECK_CHANGED event was emitted
- Ensure theme data appears in saved HTML file

### Visual Issues
- Verify CSS variable names match those in index.css
- Check for typos in variable names or values
- Ensure color values are valid CSS formats
- Test with different browsers

## Expected Outcomes

After completing this quickstart, you should have:
- A working enhanced theming system with color pickers
- Ability to create and edit themes using intuitive color selection
- Real-time preview of theme changes
- Comprehensive theming of all UI elements
- Understanding of the theme selection and editing workflow
- Confidence in theme persistence and portability

The enhanced theming system should provide a much more user-friendly experience while maintaining all the power and flexibility of the original theming system.
