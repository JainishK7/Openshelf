# Contributing to OpenShelf

Thanks for helping improve OpenShelf. Keep changes small, understandable, and easy to review.

## Before You Start

- Read the README and the relevant document under `docs/`.
- Search existing issues before opening a duplicate.
- For a non-trivial change, describe the problem in an issue first.
- Avoid unrelated formatting changes in the same pull request.

## Development Workflow

```text
Issue / task
    ↓
Create a focused branch
    ↓
Implement the change
    ↓
Run the checks
    ↓
Open a pull request
    ↓
Review
    ↓
Merge to main
```

## Branch Naming

Use a clear prefix:

- `feature/*` for new functionality
- `fix/*` for bug fixes
- `docs/*` for documentation changes
- `test/*` for testing changes
- `chore/*` for maintenance

Examples:

```text
feature/category-filter
fix/borrow-button-state
docs/setup-clarification
```

## Commit Convention

Keep commit messages short and action-oriented:

- `feat:` new functionality
- `fix:` bug correction
- `docs:` documentation change
- `test:` testing or validation
- `refactor:` internal restructuring
- `chore:` maintenance

Examples:

```text
feat: add category filter
fix: block issuing unavailable copies
docs: clarify local setup
```

## Pull Requests

Every pull request should include a short summary, the related issue where applicable, testing performed, and screenshots for visible UI changes.

Complete `.github/PULL_REQUEST_TEMPLATE.md` before requesting review.

## Documentation Changes

When setup, application behavior, or the contribution workflow changes, update the relevant documentation in the same pull request.

## Review Expectations

Reviewers should check correctness, scope, readability, documentation impact, accessibility, and unintended behavior changes.
