const STORAGE_KEY = "openshelf-library-v1";

const initialBooks = [
  { id: 101, title: "Clean Code", author: "Robert C. Martin", category: "Technology", copies: 3, borrowed: 1 },
  { id: 102, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "Technology", copies: 2, borrowed: 0 },
  { id: 103, title: "Atomic Habits", author: "James Clear", category: "Non-fiction", copies: 2, borrowed: 2 },
  { id: 104, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fiction", copies: 4, borrowed: 0 },
  { id: 105, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 2, borrowed: 0 },
  { id: 106, title: "Sapiens", author: "Yuval Noah Harari", category: "History", copies: 3, borrowed: 1 }
];

let books = loadBooks();

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function loadBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(initialBooks);
  } catch {
    return structuredClone(initialBooks);
  }
}

function saveBooks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // The demo can still run if browser storage is unavailable.
  }
}

function renderCategories() {
  const current = categoryFilter.value;
  const categories = [...new Set(books.map((book) => book.category))].sort();

  categoryFilter.innerHTML = [
    '<option value="all">All categories</option>',
    ...categories.map((category) => `<option value="${category}">${category}</option>`)
  ].join("");

  categoryFilter.value = categories.includes(current) ? current : "all";
}

function getVisibleBooks() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return books.filter((book) => {
    const matchesText = `${book.title} ${book.author}`.toLowerCase().includes(term);
    const matchesCategory = category === "all" || book.category === category;
    return matchesText && matchesCategory;
  });
}

function renderBooks() {
  const visibleBooks = getVisibleBooks();

  bookList.innerHTML = visibleBooks.length
    ? visibleBooks.map(bookTemplate).join("")
    : '<div class="empty-state">No books match the current filters.</div>';
}

function bookTemplate(book) {
  const available = book.copies - book.borrowed;

  return `
    <article class="book-card">
      <div>
        <h4 class="book-title">${escapeHtml(book.title)}</h4>
        <p class="book-meta">${escapeHtml(book.author)} · ${escapeHtml(book.category)}</p>
        <span class="status ${available ? "available" : "out"}">
          ${available ? `${available} of ${book.copies} available` : "All copies are on loan"}
        </span>
      </div>
      <div class="card-actions">
        <button class="button button-secondary button-small" data-action="issue" data-id="${book.id}" ${available === 0 ? "disabled" : ""}>Issue</button>
        <button class="button button-ghost button-small" data-action="return" data-id="${book.id}" ${book.borrowed === 0 ? "disabled" : ""}>Return</button>
      </div>
    </article>
  `;
}

function renderStats() {
  const total = books.reduce((sum, book) => sum + book.copies, 0);
  const available = books.reduce((sum, book) => sum + book.copies - book.borrowed, 0);
  const loans = books.reduce((sum, book) => sum + book.borrowed, 0);

  document.getElementById("totalBooks").textContent = total;
  document.getElementById("availableBooks").textContent = available;
  document.getElementById("activeLoans").textContent = loans;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

bookList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const book = books.find((item) => item.id === Number(button.dataset.id));
  if (!book) return;

  if (button.dataset.action === "issue" && book.borrowed < book.copies) {
    book.borrowed += 1;
  }

  if (button.dataset.action === "return" && book.borrowed > 0) {
    book.borrowed -= 1;
  }

  saveBooks();
  render();
});

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

document.getElementById("resetBtn").addEventListener("click", () => {
  books = structuredClone(initialBooks);
  saveBooks();
  render();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(books, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "openshelf-library-data.json";
  link.click();
  URL.revokeObjectURL(url);
});

function render() {
  renderCategories();
  renderBooks();
  renderStats();
}

render();
