# Tasks: FeatherWiki Theming Engine

**Input**: Design documents from `/specs/001-featherwiki-theming-engine/`
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
- [x] T001 [P] Backup existing index.css file before refactoring
- [x] T002 [P] Create validation helper functions for theme names and CSS syntax
- [x] T003 [P] Add theming-related translation keys to locales/en-US.json

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Contract test for theme application function in browser console
- [x] T005 [P] Contract test for theme state management operations
- [x] T006 [P] Integration test for theme creation and application workflow
- [x] T007 [P] Integration test for theme persistence across save/load cycles
- [x] T008 [P] Integration test for theme validation and error handling
- [x] T009 [P] Integration test for theme limit enforcement (maximum 10 themes)

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T010 [P] Refactor index.css to use CSS Custom Properties with fallback values
- [x] T011 [P] Extend initState.js to add themes and activeTheme to state.p object
- [x] T012 [P] Implement applyActiveTheme function in initEmitter.js
- [x] T013 [P] Add theme application logic to ONLOAD event handler
- [x] T014 [P] Create theming UI section in views/settings.js
- [x] T015 [P] Implement theme name validation (CSS identifier format)
- [x] T016 [P] Implement CSS syntax validation with error message display
- [x] T017 [P] Implement theme limit enforcement (maximum 10 themes)
- [x] T018 [P] Implement active theme deletion constraint logic

## Phase 3.4: Integration
- [x] T019 Connect theme UI controls to state management functions
- [x] T020 Wire up theme change events to emit CHECK_CHANGED for save functionality
- [x] T021 Integrate theme validation with UI error display
- [x] T022 Ensure theme data is included in standard save/load cycle

## Phase 3.5: Polish
- [x] T023 [P] Test theme application across all wiki pages and modes
- [x] T024 [P] Verify backward compatibility with older FeatherWiki files
- [x] T025 [P] Test theme persistence through server save/load mechanism
- [x] T026 [P] Validate all translation keys are properly implemented
- [x] T027 [P] Test theme limit enforcement and error messages
- [x] T028 [P] Test active theme deletion constraints and user flow
- [x] T029 [P] Verify CSS variable fallback values work correctly
- [x] T030 [P] Test theme application performance (no strict requirements)

## Dependencies
- Tests (T004-T009) before implementation (T010-T018)
- T010 (CSS refactoring) before T012 (theme application)
- T011 (state extension) before T012 (theme application)
- T012 (theme application) before T013 (ONLOAD integration)
- T014 (UI creation) before T019 (UI integration)
- T015-T018 (validation) before T021 (validation integration)
- Implementation before polish (T023-T030)

## Parallel Example
```
# Launch T004-T009 together (contract and integration tests):
Task: "Contract test for theme application function in browser console"
Task: "Contract test for theme state management operations"
Task: "Integration test for theme creation and application workflow"
Task: "Integration test for theme persistence across save/load cycles"
Task: "Integration test for theme validation and error handling"
Task: "Integration test for theme limit enforcement (maximum 10 themes)"

# Launch T010-T018 together (core implementation):
Task: "Refactor index.css to use CSS Custom Properties with fallback values"
Task: "Extend initState.js to add themes and activeTheme to state.p object"
Task: "Implement applyActiveTheme function in initEmitter.js"
Task: "Add theme application logic to ONLOAD event handler"
Task: "Create theming UI section in views/settings.js"
Task: "Implement theme name validation (CSS identifier format)"
Task: "Implement CSS syntax validation with error message display"
Task: "Implement theme limit enforcement (maximum 10 themes)"
Task: "Implement active theme deletion constraint logic"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- All tasks must maintain FeatherWiki's single-file portability
- All tasks must preserve server-saving mechanism
- All tasks must be ES2015+ compatible

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Theme application contract → contract test task [P]
   - Theme state management contract → contract test task [P]
   
2. **From Data Model**:
   - Theme entity → validation implementation tasks [P]
   - Active Theme entity → state management tasks [P]
   - Theme Collection entity → limit enforcement tasks [P]
   
3. **From User Stories**:
   - Theme creation story → integration test [P]
   - Theme application story → integration test [P]
   - Theme persistence story → integration test [P]

4. **Ordering**:
   - Setup → Tests → CSS Refactoring → State Management → Theme Application → UI → Validation → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have implementation tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] All clarifications incorporated (theme validation, error handling, limits, constraints)
- [x] Constitutional requirements maintained (parsimony, self-containment, UX compatibility)
