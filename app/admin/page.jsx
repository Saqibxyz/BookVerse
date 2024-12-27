"use client";

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import BookForm from "@/components/BookForm";
import UpdateBookForm from "@/components/UpdateBookForm";
import DeleteBookModal from "@/components/DeleteBookModal";

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        if (response.ok) {
          setBooks(data);
        } else {
          console.error(data.error || "Failed to fetch books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Library Management System</h1>
      </header>

      <main className="container mx-auto p-6">
        <BookForm setBooks={setBooks} />

        {editingBook && (
          <UpdateBookForm book={editingBook} setBooks={setBooks} />
        )}

        <BookList
          books={books}
          setBooks={setBooks}
          onEdit={(book) => setEditingBook(book)}
          onDelete={(bookId) => setDeletingBookId(bookId)}
        />

        {deletingBookId && (
          <DeleteBookModal
            bookId={deletingBookId}
            setBooks={setBooks}
            closeModal={() => setDeletingBookId(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
