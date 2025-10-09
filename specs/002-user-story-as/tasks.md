# Tasks: Enhanced Theming System with Color Pickers

**Input**: Design documents from `/specs/002-user-story-as/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: Repository root structure for FeatherWiki
- Paths shown below use actual FeatherWiki file structure

## Phase 3.1: Setup
- [x] T001 [P] Audit index.css for remaining hardcoded color values
- [x] T002 [P] Add new translation keys for color picker labels to locales/en-US.json
- [x] T003 [P] Create theme variable mapping configuration

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Contract test for theme selection dropdown interaction
- [x] T005 [P] Contract test for color picker generation function
- [x] T006 [P] Contract test for live preview oninput event handling
- [x] T007 [P] Contract test for state tracking onchange event handling
- [x] T008 [P] Integration test for color picker theme editing workflow
- [x] T009 [P] Integration test for theme creation with color pickers
- [x] T010 [P] Integration test for real-time preview functionality

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T011 [P] Add comprehensive CSS Custom Properties to :root selector in index.css
- [x] T012 [P] Replace all remaining hardcoded colors with CSS variables in index.css
- [x] T013 [P] Implement renderThemeEditor function in views/settings.js
- [x] T014 [P] Create theme selection dropdown with color picker interface
- [x] T015 [P] Implement color picker oninput event handlers for live preview
- [x] T016 [P] Implement color picker onchange event handlers for state tracking
- [x] T017 [P] Add theme creation workflow with starting point selection
- [x] T018 [P] Implement color validation with warning message display

## Phase 3.4: Integration
- [x] T019 Remove existing textarea-based theme editing interface
- [x] T020 Integrate color picker UI with existing theme management functions
- [x] T021 Connect live preview with applyActiveTheme function
- [x] T022 Ensure color picker changes trigger CHECK_CHANGED events

## Phase 3.5: Polish
- [x] T023 [P] Test color picker interface across all themeable UI elements
- [x] T024 [P] Verify backward compatibility with existing textarea-created themes
- [x] T025 [P] Test theme persistence through save/load cycles
- [x] T026 [P] Validate all translation keys are properly implemented
- [x] T027 [P] Test color picker validation and error handling
- [x] T028 [P] Test theme creation workflow with different starting points
- [x] T029 [P] Verify comprehensive UI theming (sidebar, active states, code blocks)
- [x] T030 [P] Test live preview performance and responsiveness

## Dependencies
- Tests (T004-T010) before implementation (T011-T018)
- T011 (CSS variables) before T012 (color replacements)
- T013 (renderThemeEditor) before T014 (theme selection UI)
- T014 (theme selection) before T015-T016 (event handlers)
- T015-T016 (event handlers) before T021 (live preview integration)
- Implementation before polish (T023-T030)

## Parallel Example
```
# Launch T004-T010 together (contract and integration tests):
Task: "Contract test for theme selection dropdown interaction"
Task: "Contract test for color picker generation function"
Task: "Contract test for live preview oninput event handling"
Task: "Contract test for state tracking onchange event handling"
Task: "Integration test for color picker theme editing workflow"
Task: "Integration test for theme creation with color pickers"
Task: "Integration test for real-time preview functionality"

# Launch T011-T018 together (core implementation):
Task: "Add comprehensive CSS Custom Properties to :root selector in index.css"
Task: "Replace all remaining hardcoded colors with CSS variables in index.css"
Task: "Implement renderThemeEditor function in views/settings.js"
Task: "Create theme selection dropdown with color picker interface"
Task: "Implement color picker oninput event handlers for live preview"
Task: "Implement color picker onchange event handlers for state tracking"
Task: "Add theme creation workflow with starting point selection"
Task: "Implement color validation with warning message display"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- All tasks must maintain FeatherWiki's single-file portability
- All tasks must preserve server-saving mechanism
- All tasks must be ES2015+ compatible
- Build upon existing theming system from previous implementation

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Theme selection contract → contract test task [P]
   - Color picker generation contract → contract test task [P]
   - Live preview contract → contract test task [P]
   - State tracking contract → contract test task [P]
   
2. **From Data Model**:
   - Enhanced Theme entity → CSS enhancement tasks [P]
   - Color Picker Configuration entity → UI implementation tasks [P]
   - Live Preview State entity → event handling tasks [P]
   
3. **From User Stories**:
   - Color picker theme editing story → integration test [P]
   - Theme creation story → integration test [P]
   - Live preview story → integration test [P]

4. **Ordering**:
   - Setup → Tests → CSS Enhancement → UI Implementation → Event Handling → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have implementation tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] All clarifications incorporated (theme selection, error handling, live preview, creation workflow)
- [x] Constitutional requirements maintained (parsimony, self-containment, UX compatibility)
- [x] Builds upon existing theming system foundation
