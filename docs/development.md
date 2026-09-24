# Development Guide

The application has three main pieces:

- `index.html` — page structure and form controls.
- `css/styles.css` — layout, states, and responsive behavior.
- `js/app.js` — catalogue state, events, persistence, and rendering.

## Local Workflow

1. Make one focused change.
2. Refresh the browser and test visible behavior.
3. Run `npm test`.
4. Run `npm run validate`.
5. Review the Git diff before committing.

No build step is required for the browser application.
