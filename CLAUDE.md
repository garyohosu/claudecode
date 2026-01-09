# CLAUDE.md - AI Assistant Guide

> **Purpose**: This document helps AI assistants understand the codebase structure, development workflows, and key conventions. Keep this file updated as the project evolves.

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflows](#development-workflows)
4. [Key Conventions](#key-conventions)
5. [Testing Strategy](#testing-strategy)
6. [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Repository Overview

### Project Information
- **Repository**: garyohosu/claudecode
- **Status**: New repository (to be populated)
- **Primary Language**: TBD
- **Framework**: TBD

### Quick Start
```bash
# Clone the repository
git clone <repository-url>

# Setup (to be added as project develops)
# npm install / pip install -r requirements.txt / etc.

# Run tests (to be added)
# npm test / pytest / etc.

# Build (to be added)
# npm run build / make / etc.
```

---

## Codebase Structure

### Directory Layout

```
claudecode/
├── .git/                 # Git version control
├── CLAUDE.md            # This file - AI assistant guide
├── README.md            # User-facing documentation (to be added)
├── src/                 # Source code (to be added)
├── tests/               # Test files (to be added)
├── docs/                # Additional documentation (to be added)
└── [other directories to be added]
```

### Key Components

*To be updated as the codebase develops with:*
- Core modules and their responsibilities
- Important files and their purposes
- External dependencies and integrations
- Configuration files and their roles

---

## Development Workflows

### Branch Strategy

- **Main Branch**: `main` or `master` (to be determined)
- **Feature Branches**: Use `claude/` prefix for AI-assisted development
  - Format: `claude/<description>-<session-id>`
  - Example: `claude/claude-md-mk64mufwaptw1eiy-MxckG`

### Git Workflow

1. **Starting Work**
   ```bash
   git checkout -b claude/<feature-name>-<session-id>
   git fetch origin
   ```

2. **During Development**
   ```bash
   # Make changes
   git add <files>
   git commit -m "Clear, descriptive commit message"
   ```

3. **Pushing Changes**
   ```bash
   git push -u origin <branch-name>
   ```
   - Always use the full branch name
   - Retry up to 4 times with exponential backoff on network errors

4. **Creating Pull Requests**
   ```bash
   gh pr create --title "Feature: Description" --body "Detailed summary"
   ```

### Commit Message Conventions

- Use clear, descriptive messages
- Start with action verbs: `Add`, `Fix`, `Update`, `Refactor`, `Remove`
- Keep messages concise but informative
- Reference issues when applicable: `Fix #123: Description`

---

## Key Conventions

### Code Style

*To be established based on project technology:*

- **Formatting**: (prettier, black, gofmt, etc.)
- **Linting**: (eslint, pylint, etc.)
- **Naming Conventions**:
  - Variables: TBD
  - Functions: TBD
  - Classes: TBD
  - Files: TBD

### File Organization

- Keep files focused and single-purpose
- Group related functionality
- Use clear, descriptive file names
- Maintain consistent directory structure

### Documentation

- Document complex logic with comments
- Keep README.md up to date
- Document public APIs
- Maintain this CLAUDE.md file

---

## Testing Strategy

### Test Structure

*To be defined:*
- Unit tests location: `tests/unit/`
- Integration tests location: `tests/integration/`
- E2E tests location: `tests/e2e/`

### Running Tests

```bash
# Run all tests
# TBD

# Run specific test suite
# TBD

# Run with coverage
# TBD
```

### Testing Guidelines

- Write tests for new features
- Maintain test coverage above X%
- Test edge cases and error conditions
- Keep tests isolated and independent

---

## AI Assistant Guidelines

### Analysis Before Action

1. **Always read before modifying**: Never propose changes to code you haven't read
2. **Understand context**: Use exploration tools to understand the codebase first
3. **Check existing patterns**: Follow established conventions in the codebase

### Tool Usage

**For File Operations:**
- Use `Read` to examine files (not `cat`)
- Use `Edit` to modify files (not `sed/awk`)
- Use `Write` to create new files (not `echo >`)
- Use `Glob` to find files by pattern
- Use `Grep` to search content

**For Exploration:**
- Use `Task` tool with `subagent_type=Explore` for understanding codebase structure
- Use `Task` tool with `subagent_type=Plan` for complex implementations
- Search before asking: try to find answers in the code first

**For Development:**
- Use `TodoWrite` to plan and track multi-step tasks
- Mark todos as `in_progress` before starting work
- Mark todos as `completed` immediately after finishing
- Never batch completions - update status in real-time

### Code Quality

**Avoid Over-Engineering:**
- Only make changes that are directly requested
- Don't add features beyond what was asked
- Don't refactor unrelated code
- Keep solutions simple and focused
- Don't add error handling for scenarios that can't happen

**Security:**
- Watch for command injection vulnerabilities
- Prevent XSS in web applications
- Avoid SQL injection
- Follow OWASP top 10 guidelines
- Fix security issues immediately when discovered

**Backwards Compatibility:**
- Don't create backwards-compatibility hacks
- If something is unused, delete it completely
- Don't rename to `_var` or add `// removed` comments

### Communication

- Be concise and clear
- Don't use emojis unless explicitly requested
- Output text directly (not via `echo` or comments)
- Reference code with `file_path:line_number` format
- Focus on technical accuracy over validation

### Git Operations

**Committing:**
- Only commit when explicitly requested
- Never skip hooks (no `--no-verify`)
- Never force push to main/master
- Check authorship before amending
- Use heredoc format for commit messages

**Pull Requests:**
- Analyze ALL commits in the PR (not just latest)
- Include comprehensive summary
- Add test plan
- Use proper formatting with heredoc

### Error Handling

- Read error messages carefully
- Check logs and output
- Investigate root causes
- Don't mark tasks complete if errors remain
- Ask for clarification when blocked

---

## Project-Specific Notes

### Dependencies

*To be added as dependencies are introduced:*
- Core dependencies
- Development dependencies
- Version constraints
- Known compatibility issues

### Environment Setup

*To be added:*
- Required environment variables
- Configuration files
- Development tools
- IDE recommendations

### Common Tasks

*To be added as common patterns emerge:*
- Adding new features
- Fixing bugs
- Running specific commands
- Deployment procedures

---

## Updating This Document

This document should be updated when:
- Project structure changes significantly
- New conventions are established
- Development workflows evolve
- New tools or dependencies are added
- Common patterns emerge

Keep this file current to maximize its value for AI assistants working on the codebase.

---

## Additional Resources

- Project README: `README.md` (to be created)
- Contributing Guidelines: `CONTRIBUTING.md` (optional)
- API Documentation: (to be added)
- Architecture Diagrams: (to be added)

---

*Last Updated: 2026-01-09*
*Document Version: 1.0.0*
