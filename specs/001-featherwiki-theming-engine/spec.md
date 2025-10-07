# Feature Specification: FeatherWiki Theming Engine

**Feature Branch**: `001-featherwiki-theming-engine`  
**Created**: 2025-01-07  
**Status**: Draft  
**Input**: User description: "# FeatherWiki Theming Engine Implementation Plan

user_story: >
  As a FeatherWiki user, I want to create, manage, and apply visual themes
  to my wiki, so that I can personalize its appearance and improve readability.

requirements:
  - id: REQ-CSS-01
    description: >
      Refactor the entire `index.css` file to use CSS Custom Properties (variables)
      for all colors, backgrounds, fonts, and key spacing values. Every variable
      MUST have a fallback value.
      Example: `background: #fff;` becomes `background: var(--bg-primary, #fff);`

  - id: REQ-STATE-01
    description: >
      Modify `initState.js` to augment the core data object `state.p`. The object
      MUST be extended with two new keys: `themes` (initialized to `{}`) and
      `activeTheme` (initialized to `'default'`).

  - id: REQ-LOGIC-01
    description: >
      Implement a theme application function in `initEmitter.js`. This function MUST:
      1. Run on the `ONLOAD` event and when the active theme is changed.
      2. Read the `state.p.activeTheme` and `state.p.themes` objects.
      3. Dynamically generate and inject a `<style id='fw-theme'>` element into the
         document `<head>` containing a `:root` block with the theme's variables.
      4. Remove any pre-existing `<style id='fw-theme'>` element before injection to
         prevent conflicts.

  - id: REQ-UI-01
    description: >
      Create a "Theming" section within the `views/settings.js` view. This section MUST contain:
      1. A `<select>` dropdown to set `state.p.activeTheme`.
      2. UI controls (inputs, buttons) to create, rename, and delete themes stored in `state.p.themes`.
      3. A `<textarea>` to edit the CSS variable key-value pairs for a selected theme.
      4. All UI interactions that modify theme data MUST emit the `events.CHECK_CHANGED` event.

  - id: REQ-I18N-01
    description: >
      All new user-facing text strings introduced by the UI in REQ-UI-01 MUST be
      added as keys to `locales/en-US.json` for internationalization.

definition_of_done:
  - All functional and non-functional requirements listed above are implemented.
  - All acceptance criteria are met without regression to existing functionality.
  - The implementation is fully compliant with the FeatherWiki SpecKit Constitution, particularly the principles of Parsimony and Self-Containment.
  - The final code is merged into the main repository branch.

acceptance_criteria:
  - criteria: "GIVEN the wiki is loaded, WHEN I inspect the DOM in the settings view, THEN a new 'Theming' section is present."
  - criteria: "GIVEN I am in the Theming section, WHEN I create a new theme named 'dark_mode' with the content '--bg-primary: #000;', THEN the `state.p.themes` object contains a `dark_mode` key with the corresponding value."
  - criteria: "GIVEN I have created the 'dark_mode' theme, WHEN I select it from the 'Active Theme' dropdown, THEN the wiki's background color immediately changes to black."
  - criteria: "GIVEN the 'dark_mode' theme is active, WHEN I save the wiki, open the newly downloaded file, THEN the wiki loads with the 'dark_mode' theme applied by default."
  - criteria: "GIVEN I delete the 'dark_mode' theme, WHEN I inspect the `state.p.themes` object, THEN the `dark_mode` key no longer exists."
  - criteria: "GIVEN the theming UI is visible, WHEN I view the source, THEN all labels and text are sourced from translatable keys (e.g., `{{translate:activeTheme}}`)."
  - criteria: "GIVEN an older FeatherWiki file is imported without theme data, WHEN it loads, THEN it MUST render correctly using the default fallback theme without errors.""

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
- Q: What are the specific validation rules for theme names to prevent conflicts and ensure data integrity? → A: Allow any valid CSS identifier format (letters, numbers, hyphens, underscores)
- Q: When a user enters invalid CSS syntax in the theme editor, what should happen? → A: Reject the entire theme save and show error message
- Q: What is the maximum acceptable time for theme changes to be visually applied? → A: No strict requirements
- Q: When a user tries to delete the currently active theme, what should happen? → A: Allow deletion but require user to select new active theme first
- Q: Is there a limit on how many custom themes a user can create? → A: Maximum 10 themes per wiki

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a FeatherWiki user, I want to create, manage, and apply visual themes to my wiki, so that I can personalize its appearance and improve readability for different use cases and preferences.

### Acceptance Scenarios
1. **Given** I am viewing the FeatherWiki settings page, **When** I navigate to the Theming section, **Then** I can see controls to manage themes and select an active theme
2. **Given** I want to create a new theme, **When** I enter a theme name and CSS variables, **Then** the theme is saved and becomes available for selection
3. **Given** I have multiple themes available, **When** I select a different theme from the dropdown, **Then** the wiki's appearance immediately updates to reflect the new theme
4. **Given** I have applied a custom theme, **When** I save the wiki file, **Then** the theme persists and loads automatically when I reopen the file
5. **Given** I want to modify an existing theme, **When** I edit the CSS variables in the textarea, **Then** the changes are saved and applied immediately
6. **Given** I no longer need a theme, **When** I delete it from the theme management interface, **Then** the theme is removed and no longer available for selection

### Edge Cases
- What happens when a user tries to create a theme with an invalid CSS syntax? → System rejects the entire theme save and displays an error message
- How does the system handle theme selection when the selected theme no longer exists?
- What occurs when a user imports an older FeatherWiki file that doesn't have theme data?
- How does the system behave when CSS variables reference non-existent values?
- What happens if the theming system fails to load or apply a theme?
- What happens when a user tries to delete the currently active theme? → System requires user to select a new active theme before allowing deletion
- What happens when a user tries to create more than 10 themes? → System prevents creation and shows limit reached message

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST allow users to create custom visual themes with user-defined CSS variables
- **FR-002**: System MUST provide a dropdown interface for users to select and switch between available themes
- **FR-003**: System MUST immediately apply theme changes when a user selects a different active theme
- **FR-004**: System MUST persist theme data within the wiki's core data structure for portability
- **FR-005**: System MUST provide fallback styling when theme data is missing or invalid
- **FR-006**: System MUST allow users to edit existing themes by modifying CSS variable definitions
- **FR-007**: System MUST allow users to delete themes they no longer need
- **FR-008**: System MUST support internationalization for all theming-related user interface text
- **FR-009**: System MUST maintain backward compatibility with existing FeatherWiki files that lack theme data
- **FR-010**: System MUST use CSS Custom Properties (variables) for all themeable visual elements
- **FR-011**: System MUST emit change events when theme data is modified to trigger save functionality
- **FR-012**: System MUST prevent theme conflicts by removing existing theme styles before applying new ones

### Key Entities *(include if feature involves data)*
- **Theme**: A collection of CSS variable definitions that define the visual appearance of the wiki, stored as key-value pairs with a unique name identifier (must be valid CSS identifier format: letters, numbers, hyphens, underscores)
- **Active Theme**: The currently selected theme that determines the wiki's visual appearance, stored as a string reference to a theme name
- **Theme Collection**: A data structure containing all available themes, organized by theme name for easy lookup and management (maximum 10 themes per wiki)

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