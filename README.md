# OpenShelf

OpenShelf is a small browser-based library catalogue and lending tracker built with plain HTML, CSS, and JavaScript. It is intentionally lightweight so that the application can be understood and run without a framework, backend, or hosted database.

The repository also demonstrates practical open-source development habits: readable documentation, Git conventions, issue templates, pull requests, and repeatable checks.

## Features

- Search books by title or author.
- Filter the catalogue by category.
- Issue and return books while tracking availability.
- Add a new title or increase copies of an existing title.
- Record a short recent-activity history.
- Persist demonstration data in browser `localStorage`.
- Export the current catalogue as JSON.
- Run repository checks locally or through GitHub Actions.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- Node.js for repository checks
- Git and GitHub for version control and collaboration

## Project Structure

```text
OpenShelf/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
├── assets/
├── css/
│   └── styles.css
├── docs/
├── js/
│   └── app.js
├── tests/
│   └── smoke-test.mjs
├── index.html
├── package.json
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
└── LICENSE
```

## Installation

No application server is required.

1. Clone the repository.
2. Open the project directory.
3. Open `index.html` directly in a modern browser, or serve the directory with a local static server.

For example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

Node.js 18+ is optional for repository checks.

## Usage

Use the search field and category filter to find books. **Issue** decreases availability and **Return** restores it.

The **Add a book** form adds a catalogue entry. If the title already exists, the submitted copies are added to that record.

Use **Export data** to download the current browser state as JSON and **Reset demo** to restore the sample catalogue.

## Library Workflow

OpenShelf is designed around a simple catalogue workflow:

| Action | Purpose |
|---|---|
| Search / Filter | Find books by title, author, or category. |
| Issue | Record a book issue and reduce its available copies. |
| Return | Record a return and restore an available copy. |
| Add a book | Add a new title or increase copies of an existing title. |
| Export data | Download the current catalogue state as JSON. |
| Reset demo | Restore the original demonstration catalogue. |

These actions can be used directly from the browser without a backend or external database.

## Validation

Run the lightweight checks before submitting a pull request:

```bash
npm test
npm run validate
```

Or:

```bash
npm run check
```

## Data and Privacy

The demonstration stores catalogue changes in browser `localStorage`. It does not send catalogue data to a remote service and does not include user accounts or an external API.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Bug reports and feature requests use the templates in `.github/ISSUE_TEMPLATE/`.

## Security

See [SECURITY.md](SECURITY.md) for reporting guidance.

## License

OpenShelf is released under the MIT License. See [LICENSE](LICENSE).

