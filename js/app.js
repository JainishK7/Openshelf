const STORAGE_KEY = "openshelf-library-v2";

const initialState = {
  books: [
    { id: 101, title: "Clean Code", author: "Robert C. Martin", category: "Technology", copies: 3, borrowed: 1 },
    { id: 102, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "Technology", copies: 2, borrowed: 0 },
    { id: 103, title: "Atomic Habits", author: "James Clear", category: "Non-fiction", copies: 2, borrowed: 2 },
    { id: 104, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fiction", copies: 4, borrowed: 0 },
    { id: 105, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 2, borrowed: 0 },
    { id: 106, title: "Sapiens", author: "Yuval Noah Harari", category: "History", copies: 3, borrowed: 1 }
  ],
  activity: [
    { message: "Demo catalogue loaded", time: new Date().toISOString() }
  ]
};

let state = loadState();

const elements = {
  bookList: document.getElementById("bookList"),
  activityList: document.getElementById("activityList"),
  searchInput: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  bookForm: document.getElementById("bookForm"),
  formMessage: document.getElementById("formMessage"),
  totalBooks: document.getElementById("totalBooks"),
  availableBooks: document.getElementById("availableBooks"),
  activeLoans: document.getElementById("activeLoans"),
  titleCount: document.getElementById("titleCount")
};

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : cloneInitialState();
  } catch {
    return cloneInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The app remains usable even when browser storage is blocked.
  }
}

function addActivity(message) {
  state.activity.unshift({
    message,
    time: new Date().toISOString()
  });

  state.activity = state.activity.slice(0, 6);
}

function getCategories() {
  return [...new Set(state.books.map((book) => book.category))].sort();
}

function renderCategories() {
  const current = elements.categoryFilter.value;

  elements.categoryFilter.innerHTML = [
    '<option value="all">All categories</option>',
    ...getCategories().map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
  ].join("");

  elements.categoryFilter.value = getCategories().includes(current) ? current : "all";
}

function getVisibleBooks() {
  const term = elements.searchInput.value.trim().toLowerCase();
  const category = elements.categoryFilter.value;

  return state.books.filter((book) => {
    const matchesText = `${book.title} ${book.author}`.toLowerCase().includes(term);
    const matchesCategory = category === "all" || book.category === category;
    return matchesText && matchesCategory;
  });
}

function renderBooks() {
  const visibleBooks = getVisibleBooks();

  elements.bookList.innerHTML = visibleBooks.length
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
  const totalCopies = state.books.reduce((sum, book) => sum + book.copies, 0);
  const availableCopies = state.books.reduce((sum, book) => sum + book.copies - book.borrowed, 0);
  const loans = state.books.reduce((sum, book) => sum + book.borrowed, 0);

  elements.totalBooks.textContent = totalCopies;
  elements.availableBooks.textContent = availableCopies;
  elements.activeLoans.textContent = loans;
  elements.titleCount.textContent = state.books.length;
}

function renderActivity() {
  elements.activityList.innerHTML = state.activity.map((item) => `
    <div class="activity-item">
      <strong>${escapeHtml(item.message)}</strong>
      <span>${formatTime(item.time)}</span>
    </div>
  `).join("");
}

function handleBookAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const book = state.books.find((item) => item.id === Number(button.dataset.id));
  if (!book) return;

  if (button.dataset.action === "issue" && book.borrowed < book.copies) {
    book.borrowed += 1;
    addActivity(`Issued "${book.title}"`);
  }

  if (button.dataset.action === "return" && book.borrowed > 0) {
    book.borrowed -= 1;
    addActivity(`Returned "${book.title}"`);
  }

  saveState();
  render();
}

function handleAddBook(event) {
  event.preventDefault();

  const formData = new FormData(elements.bookForm);
  const title = String(formData.get("title") || "").trim();
  const author = String(formData.get("author") || "").trim();
  const category = String(formData.get("category") || "Technology");
  const copies = Number(formData.get("copies"));

  if (!title || !author || !Number.isInteger(copies) || copies < 1) {
    elements.formMessage.textContent = "Please enter a title, author, and at least one copy.";
    return;
  }

  const existing = state.books.find((book) => book.title.toLowerCase() === title.toLowerCase());

  if (existing) {
    existing.copies += copies;
    addActivity(`Added ${copies} cop${copies === 1 ? "y" : "ies"} to "${existing.title}"`);
  } else {
    state.books.push({
      id: Date.now(),
      title,
      author,
      category,
      copies,
      borrowed: 0
    });
    addActivity(`Added "${title}" to the catalogue`);
  }

  elements.formMessage.textContent = "Catalogue updated.";
  elements.bookForm.reset();
  elements.bookForm.elements.copies.value = 1;

  saveState();
  render();
}

function resetDemo() {
  state = cloneInitialState();
  saveState();
  elements.formMessage.textContent = "Demo data restored.";
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "openshelf-library-data.json";
  link.click();

  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "recently"
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function render() {
  renderCategories();
  renderBooks();
  renderActivity();
  renderStats();
}

elements.bookList.addEventListener("click", handleBookAction);
elements.bookForm.addEventListener("submit", handleAddBook);
elements.searchInput.addEventListener("input", renderBooks);
elements.categoryFilter.addEventListener("change", renderBooks);
document.getElementById("resetBtn").addEventListener("click", resetDemo);
document.getElementById("exportBtn").addEventListener("click", exportData);

render();
