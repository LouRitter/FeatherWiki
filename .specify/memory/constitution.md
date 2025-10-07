<!--
Sync Impact Report:
Version change: 1.0.0 → 1.0.0 (initial constitution)
Modified principles: N/A (new constitution)
Added sections: Core Principles, Development Workflow & Review Process, Roles & Responsibilities, Governance
Removed sections: N/A (new constitution)
Templates requiring updates: ✅ plan-template.md (constitution check section updated), ⚠ pending: spec-template.md, tasks-template.md, agent-file-template.md
Follow-up TODOs: None
-->

# FeatherWiki SpecKit Constitution

## Core Principles

### I. Parsimony (The Size Mandate)
All features must be developed with file size as a primary constraint. Code must be minimalist vanilla JS (ES2015+). The core build is dependency-free; optional extensions must load libraries dynamically from a CDN. Existing styles and helpers must be reused before creating new ones.

### II. Self-Containment (The Quine Mandate)
The application and its data must remain a single, portable HTML file. All feature data must be serializable to JSON and stored within the primary data object (state.p). Features must function without any external setup when the file is moved.

### III. User Experience & Compatibility
UI elements must be unobtrusive and blend with the existing aesthetic. All user-facing text strings must be translatable via language-specific extension files. Features must not raise the ES2015 baseline and must degrade gracefully.

### IV. Server Integrity (NON-NEGOTIABLE)
The core server-saving mechanism is inviolable. All contributions must preserve the OPTIONS request for dav header detection, the PUT request structure for saving the complete HTML file, and the documented success/failure response handling.

### V. Licensing & Openness
All code contributions must be compatible with the AGPL-3.0 or later license. User-generated content is the property of the user and is not subject to the AGPL unless its author specifies otherwise.

## Development Workflow & Review Process

Trivial Fixes (typos, docs, non-functional refactors): Require one (1) Core Contributor review for merge.

Feature Additions / Behavior Changes: Require an RFC (Request for Comments) issue to be opened for a minimum of five (5) days to achieve lazy consensus before a Pull Request is considered. Contested RFCs require a formal Maintainer vote.

## Roles & Responsibilities

Maintainers: Own architectural direction, releases, security reviews, and final merge decisions.

Core Contributors: Trusted reviewers with merge rights for low-risk changes.

Contributors: Anyone proposing issues or Pull Requests under the rules herein.

Users: Content authors and deployers whose feedback guides project priorities.

## Governance

This Constitution supersedes all other practices and internal documentation. Amendments require a documented RFC, Maintainer approval, and a clear migration plan if applicable. All Pull Requests and code reviews must verify compliance with this document. Any added complexity must be explicitly justified against the Principle of Parsimony.

**Version**: 1.0.0 | **Ratified**: 2025-01-07 | **Last Amended**: 2025-01-07