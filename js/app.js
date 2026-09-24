const books = [
  { id: 101, title: "Clean Code", author: "Robert C. Martin", category: "Technology", copies: 3, borrowed: 1 },
  { id: 102, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "Technology", copies: 2, borrowed: 0 },
  { id: 103, title: "Atomic Habits", author: "James Clear", category: "Non-fiction", copies: 2, borrowed: 2 },
  { id: 104, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fiction", copies: 4, borrowed: 0 }
];

const bookList = document.getElementById("bookList");

function renderBooks() {
  bookList.innerHTML = books.map((book) => `
    <article class="book-card">
      <h4 class="book-title">${book.title}</h4>
      <p class="book-meta">${book.author} · ${book.category}</p>
    </article>
  `).join("");
}

function renderStats() {
  const total = books.reduce((sum, book) => sum + book.copies, 0);
  const available = books.reduce((sum, book) => sum + book.copies - book.borrowed, 0);
  const loans = books.reduce((sum, book) => sum + book.borrowed, 0);

  document.getElementById("totalBooks").textContent = total;
  document.getElementById("availableBooks").textContent = available;
  document.getElementById("activeLoans").textContent = loans;
}

renderBooks();
renderStats();
