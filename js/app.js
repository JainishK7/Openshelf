const books = [
  { id: 101, title: "Clean Code", author: "Robert C. Martin", category: "Technology", copies: 3, borrowed: 1 },
  { id: 102, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "Technology", copies: 2, borrowed: 0 },
  { id: 103, title: "Atomic Habits", author: "James Clear", category: "Non-fiction", copies: 2, borrowed: 2 },
  { id: 104, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fiction", copies: 4, borrowed: 0 },
  { id: 105, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 2, borrowed: 0 },
  { id: 106, title: "Sapiens", author: "Yuval Noah Harari", category: "History", copies: 3, borrowed: 1 }
];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderCategories() {
  const categories = [...new Set(books.map((book) => book.category))].sort();
  categoryFilter.innerHTML = [
    '<option value="all">All categories</option>',
    ...categories.map((category) => `<option value="${category}">${category}</option>`)
  ].join("");
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
    ? visibleBooks.map((book) => `
      <article class="book-card">
        <h4 class="book-title">${book.title}</h4>
        <p class="book-meta">${book.author} · ${book.category}</p>
      </article>
    `).join("")
    : '<div class="empty-state">No books match the current filters.</div>';
}

function renderStats() {
  const total = books.reduce((sum, book) => sum + book.copies, 0);
  const available = books.reduce((sum, book) => sum + book.copies - book.borrowed, 0);
  const loans = books.reduce((sum, book) => sum + book.borrowed, 0);

  document.getElementById("totalBooks").textContent = total;
  document.getElementById("availableBooks").textContent = available;
  document.getElementById("activeLoans").textContent = loans;
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

renderCategories();
renderBooks();
renderStats();
