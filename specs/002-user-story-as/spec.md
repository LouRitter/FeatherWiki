# Feature Specification: Enhanced Theming System with Color Pickers

**Feature Branch**: `002-user-story-as`  
**Created**: 2025-01-07  
**Status**: Draft  
**Input**: User description: "user_story: >
  As a FeatherWiki user, I want to theme all parts of the UI, including the sidebar and active elements which are not currently effected by the theme, using an intuitive color picker, so I can easily create and share comprehensive custom themes.

requirements:
  - id: REQ-CSS-02
    description: >
      A comprehensive refactor of `index.css` is required to eliminate all remaining hardcoded color values. New CSS Custom Properties (variables) MUST be introduced for UI elements like the sidebar, active/selected states, and code blocks. All variables MUST have a fallback value.
    target_file: \"index.css\"
    suggested new_variables:
      - \"--sidebar-bg: #ddd\"
      - \"--sidebar-text-color: #000\"
      - \"--active-element-bg: #87C\"
      - \"--active-element-text: #fff\"
      - \"--danger-bg: red\"
      - \"--code-bg: #eee\"
MAY NOT BE A COMPREHENSIVE LIST OF CLASSES THAT SHOULD BE INCLUDED

  - id: REQ-UI-02
    description: >
      The theme editor UI in `views/settings.js` MUST be replaced. The existing `<textarea>` for manual CSS entry MUST be removed and substituted with a user-friendly interface composed of labeled `<input type=\"color\">` elements for core theme properties. the existing alert to set theme properties should be removed
    target_file: \"views/settings.js\"
    ui_map:
      - { label_key: \"themePrimaryBg\", variable: \"--bg-primary\" }
      - { label_key: \"themeTextMain\", variable: \"--text-main\" }
      - { label_key: \"themeAccent\", variable: \"--accent-color\" }
      - { label_key: \"themeSidebarBg\", variable: \"--sidebar-bg\" }
      - { label_key: \"themeActiveElementBg\", variable: \"--active-element-bg\" }

  - id: REQ-LOGIC-02
    description: >
      The event handling logic for the theme editor in `views/settings.js` MUST be updated to support a live-preview workflow with the new color picker UI.
    target_file: \"views/settings.js\"
    spec:
      - \"The `oninput` event for each `<input type='color'>` MUST update the corresponding variable in the `state.p.themes` object for the selected theme.\"
      - \"The `oninput` event handler MUST then immediately call the `applyActiveTheme()` function to reflect the color change live in the UI.\"
      - \"The `onchange` event (triggered when the color picker is closed) MUST emit the `events.CHECK_CHANGED` event to mark the wiki as needing a save.\"
      - \"The 'Save Theme' button MUST be removed, as saving is now handled by the main 'Save Wiki' flow.\"

  - id: REQ-I18N-02
    description: >
      New translation keys for the color picker labels MUST be added to `locales/en-US.json`.
    target_file: \"locales/en-US.json\"
    keys_to_add:
      - { key: \"themePrimaryBg\", value: \"Primary Background\" }
      - { key: \"themeTextMain\", value: \"Main Text\" }
      - { key: \"themeAccent\", value: \"Accent / Links\" }
      - { key: \"themeSidebarBg\", value: \"Sidebar Background\" }
      - { key: \"themeActiveElementBg\", value: \"Active Element Background\" }

definition_of_done:
  - All requirements (REQ-CSS-02, REQ-UI-02, REQ-LOGIC-02, REQ-I18N-02) are implemented.
  - All acceptance criteria are met.
  - No regressions are introduced to existing functionality, especially server-saving.
  - The implementation remains compliant with the FeatherWiki SpecKit Constitution.

acceptance_criteria:
  - criteria: \"GIVEN a theme is selected for editing, WHEN I use the 'Sidebar Background' color picker, THEN the sidebar's background color changes in real-time.\"
  - criteria: \"GIVEN a theme is selected, WHEN I use the 'Active Element Background' color picker, THEN the background color of the currently active tab (e.g., 'Pages') changes in real-time.\"
  - criteria: \"GIVEN I change a color using a color picker, WHEN I close the picker, THEN the main 'Save Wiki' button becomes highlighted, indicating unsaved changes.\"
  - criteria: \"GIVEN I have set a custom sidebar color and save the wiki, WHEN I reload the saved file, THEN the custom sidebar color is applied on load.\"
  - criteria: \"GIVEN I inspect the new UI in the settings page, THEN all labels for the color pickers are sourced from the translation file.\""

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

## Clarifications

### Session 2025-01-07
- Q: How should users select which theme to edit when using the color picker interface? → A: Provide a dropdown to select which theme to edit before showing color pickers
- Q: What should happen when a user enters an invalid color value in a color picker? → A: Accept the color but show a warning message
- Q: Should the live preview apply changes to the currently active theme or only to the theme being edited? → A: Apply changes to the currently active theme if it matches the edited theme
- Q: When creating a new theme, should the color pickers start with default values or inherit from the currently active theme? → A: Allow user to choose the starting point (default, current, or neutral)
- Q: What is the maximum acceptable delay for live preview updates when using color pickers? → A: No limit on delay

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a FeatherWiki user, I want to theme all parts of the UI, including the sidebar and active elements which are not currently affected by the theme, using an intuitive color picker, so I can easily create and share comprehensive custom themes.

### Acceptance Scenarios
1. **Given** I am in the theme editor, **When** I select a theme from the dropdown, **Then** color pickers appear for that theme's properties
2. **Given** I have selected a theme for editing, **When** I use the "Sidebar Background" color picker, **Then** the sidebar's background color changes in real-time
3. **Given** I have selected a theme for editing, **When** I use the "Active Element Background" color picker, **Then** the background color of the currently active tab changes in real-time
4. **Given** I change a color using a color picker, **When** I close the picker, **Then** the main "Save Wiki" button becomes highlighted, indicating unsaved changes
5. **Given** I have set custom colors and save the wiki, **When** I reload the saved file, **Then** all custom colors are applied on load
6. **Given** I am viewing the theme editor, **When** I inspect the UI, **Then** all labels for the color pickers are sourced from the translation file
7. **Given** I want to create a new theme, **When** I select "Create New Theme", **Then** I can choose a starting point (default, current, or neutral) and see color pickers for all themeable UI elements
8. **Given** I am editing an existing theme, **When** I change colors using the pickers, **Then** the changes are immediately visible across the entire UI

### Edge Cases
- What happens when a user tries to use an invalid color value in a color picker? → System accepts the color but displays a warning message
- How does the system handle color picker changes when no theme is selected for editing?
- What occurs when a user closes the color picker without making changes?
- How does the system behave when the live preview fails to apply a color change?
- What happens if the color picker UI becomes unresponsive during theme editing?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST provide color picker interface for all themeable UI elements including sidebar, active states, and code blocks
- **FR-002**: System MUST update theme colors in real-time as users interact with color pickers, applying changes to the currently active theme if it matches the theme being edited
- **FR-003**: System MUST eliminate all hardcoded color values in favor of CSS Custom Properties with fallback values
- **FR-004**: System MUST integrate color picker changes with the existing save/load workflow
- **FR-005**: System MUST provide intuitive labels for all color picker controls using translation keys
- **FR-006**: System MUST remove the manual CSS textarea interface in favor of color pickers
- **FR-007**: System MUST apply color changes immediately to provide live preview functionality
- **FR-008**: System MUST mark the wiki as needing a save when color picker changes are made
- **FR-009**: System MUST persist all color picker selections in the theme data structure
- **FR-010**: System MUST maintain backward compatibility with existing themes created using the textarea interface
- **FR-011**: System MUST support theming of previously hardcoded UI elements (sidebar, active states, code blocks)
- **FR-012**: System MUST provide fallback colors for all new CSS Custom Properties to ensure functionality

### Key Entities *(include if feature involves data)*
- **Color Picker Configuration**: Defines which UI elements have color pickers and their corresponding CSS variables
- **Live Preview State**: Tracks real-time color changes during theme editing without requiring save operations
- **Enhanced Theme Data**: Extended theme object structure that includes all new CSS Custom Properties for comprehensive UI theming

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous  
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---