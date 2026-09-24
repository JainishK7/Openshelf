# Repository Workflow

OpenShelf uses:

```text
Issue → branch → change → checks → pull request → review → merge
```

Use focused branches such as `feature/category-filter`, `fix/borrow-state`, or `docs/setup-clarification`.

Keep commits small and use the prefixes documented in `CONTRIBUTING.md`.

Before opening a pull request, run:

```bash
npm run check
```
