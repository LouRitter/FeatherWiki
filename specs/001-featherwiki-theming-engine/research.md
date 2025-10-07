# Research: FeatherWiki Theming Engine

## CSS Custom Properties Implementation

**Decision**: Use CSS Custom Properties (CSS Variables) with fallback values for all themeable elements.

**Rationale**: 
- Native browser support in all modern browsers (ES2015+ baseline)
- Minimal performance impact compared to JavaScript-based theming
- Maintains CSS specificity and cascade behavior
- Fallback values ensure backward compatibility with older files

**Alternatives considered**:
- JavaScript-based style manipulation: Rejected due to performance overhead and complexity
- CSS classes with JavaScript switching: Rejected due to file size impact and maintenance complexity
- External stylesheet loading: Rejected due to violation of self-containment principle

## State Management Approach

**Decision**: Store theme data directly in the core state.p object with keys `themes` and `activeTheme`.

**Rationale**:
- Maintains single-file portability (constitutional requirement)
- Integrates with existing save/load mechanism
- Simple data structure that's easily serializable to JSON
- Backward compatible with existing FeatherWiki files

**Alternatives considered**:
- Separate theme storage system: Rejected due to complexity and portability concerns
- Local storage: Rejected due to violation of self-containment principle
- External theme files: Rejected due to portability requirements

## Theme Application Strategy

**Decision**: Dynamic style injection via `<style id="fw-theme">` element in document head.

**Rationale**:
- Immediate application without page reload
- Overrides default CSS variables effectively
- Minimal DOM manipulation
- Easy cleanup and replacement

**Alternatives considered**:
- CSS class switching: Rejected due to file size impact and maintenance overhead
- Style attribute manipulation: Rejected due to specificity and performance concerns
- External stylesheet injection: Rejected due to self-containment requirements

## UI Integration Pattern

**Decision**: Integrate theming controls into existing settings.js view using nanohtml.

**Rationale**:
- Maintains existing UI patterns and consistency
- Leverages existing translation system
- Minimal code addition
- Familiar user experience

**Alternatives considered**:
- Separate theming page: Rejected due to UI complexity and navigation overhead
- Modal-based interface: Rejected due to complexity and mobile usability concerns
- Extension-based approach: Rejected due to maintenance and integration complexity

## Error Handling Strategy

**Decision**: Reject entire theme save and display error message for invalid CSS syntax.

**Rationale**:
- Prevents corrupted theme data from being saved
- Provides clear feedback to users about syntax errors
- Maintains data integrity and prevents broken themes
- Aligns with user expectations for validation feedback

**Alternatives considered**:
- Graceful degradation with fallback: Rejected due to potential data corruption
- Accept partial themes: Rejected due to unpredictable behavior
- Silent failure: Rejected due to user confusion

## Theme Validation Strategy

**Decision**: Validate theme names using CSS identifier format (letters, numbers, hyphens, underscores).

**Rationale**:
- Ensures compatibility with CSS variable naming conventions
- Prevents naming conflicts and invalid identifiers
- Maintains consistency with web standards
- Simple validation rules that are easy to implement

**Alternatives considered**:
- Allow any non-empty string: Rejected due to potential conflicts
- Restrict to alphanumeric only: Rejected as too limiting
- No validation: Rejected due to potential system errors

## Theme Management Constraints

**Decision**: Maximum 10 themes per wiki with deletion requiring new active theme selection.

**Rationale**:
- Prevents excessive data bloat in single-file format
- Maintains reasonable UI complexity
- Ensures system always has a valid active theme
- Prevents broken state when deleting active theme

**Alternatives considered**:
- Unlimited themes: Rejected due to file size concerns
- Automatic fallback to default: Rejected as too disruptive
- Prevent active theme deletion: Rejected as too restrictive

## Performance Requirements

**Decision**: No strict timing requirements for theme application.

**Rationale**:
- CSS variable changes are inherently fast in modern browsers
- Focus on correctness over micro-optimization
- Maintains flexibility for different hardware capabilities
- Aligns with FeatherWiki's minimalist philosophy

**Alternatives considered**:
- Strict sub-100ms requirement: Rejected as unnecessary constraint
- Performance monitoring: Rejected due to complexity
- Optimized application timing: Rejected as premature optimization
