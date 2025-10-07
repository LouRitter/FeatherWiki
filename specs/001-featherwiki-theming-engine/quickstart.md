# Quickstart: FeatherWiki Theming Engine

## Prerequisites
- FeatherWiki with theming engine implemented
- Modern web browser supporting CSS Custom Properties
- Basic understanding of CSS variables

## Quick Test: Create and Apply a Dark Theme

### Step 1: Access Theming Controls
1. Open your FeatherWiki
2. Navigate to Settings (gear icon)
3. Scroll to the "Theming" section

### Step 2: Create a New Theme
1. In the theme management area, click "Create New Theme"
2. Enter theme name: `dark_mode` (must be valid CSS identifier format)
3. In the CSS variables textarea, enter:
   ```css
   --bg-primary: #121212;
   --text-main: #ffffff;
   --accent-color: #bb86fc;
   --border-color: #333333;
   ```
4. Click "Save Theme" (invalid CSS syntax will be rejected with error message)

### Step 3: Apply the Theme
1. In the "Active Theme" dropdown, select `dark_mode`
2. Observe immediate visual change: background becomes dark, text becomes white
3. Navigate to different pages to verify theme consistency

### Step 4: Verify Persistence
1. Save the wiki (Ctrl+S or Save button)
2. Close and reopen the wiki file
3. Verify the dark theme is still active and applied

## Advanced Usage: Custom Theme Creation

### Step 1: Analyze Current Styling
1. Open browser developer tools (F12)
2. Inspect elements to identify CSS variables in use
3. Note the `--variable-name` format

### Step 2: Create Custom Theme
1. Create new theme with descriptive name
2. Define CSS variables based on your design preferences
3. Use standard CSS color formats: hex, rgb, hsl
4. Test theme application in real-time

### Step 3: Theme Management
- **Edit**: Select theme from dropdown, modify variables, save
- **Delete**: Select theme, click delete (cannot delete active theme)
- **Export**: Copy theme variables for sharing
- **Import**: Paste theme variables into new theme

## Validation Checklist

### Functional Tests
- [ ] Theming section appears in settings
- [ ] Can create new theme with valid CSS identifier name
- [ ] Theme application works (no strict timing requirements)
- [ ] Theme persists after save/load cycle
- [ ] Can edit existing theme variables
- [ ] Can delete unused themes
- [ ] Cannot delete active theme (requires new theme selection first)
- [ ] Invalid theme names are rejected (non-CSS identifier format)
- [ ] Invalid CSS syntax is rejected with error message
- [ ] Maximum 10 themes limit is enforced

### Visual Tests
- [ ] Background colors change as expected
- [ ] Text colors provide adequate contrast
- [ ] Accent colors are applied consistently
- [ ] Borders and spacing adjust properly
- [ ] Theme works across all wiki pages
- [ ] Theme works in both edit and view modes

### Compatibility Tests
- [ ] Older FeatherWiki files load without errors
- [ ] Default theme applies when no custom themes exist
- [ ] Invalid theme references fall back to default
- [ ] Theme data survives file transfers
- [ ] Server save/load preserves theme data

## Troubleshooting

### Theme Not Applying
- Check browser console for CSS errors
- Verify CSS variable syntax (must start with `--`)
- Ensure theme name doesn't contain special characters
- Try refreshing the page

### Theme Not Persisting
- Verify wiki was saved after theme changes
- Check that `events.CHECK_CHANGED` was emitted
- Ensure theme data appears in saved HTML file

### Visual Issues
- Verify CSS variable names match those in `index.css`
- Check for typos in variable names or values
- Ensure color values are valid CSS formats
- Test contrast ratios for accessibility

### Performance Issues
- Theme application should be immediate
- No noticeable delay when switching themes
- File size increase should be minimal
- No memory leaks in theme switching

## Expected Outcomes

After completing this quickstart, you should have:
- A working theming system in your FeatherWiki
- Ability to create, apply, and manage custom themes
- Understanding of CSS variable usage in themes
- Confidence in theme persistence and portability
- Knowledge of troubleshooting common issues

The theming engine should integrate seamlessly with existing FeatherWiki functionality while maintaining the single-file portability and minimalist design principles.
