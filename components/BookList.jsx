import React, { useEffect, useState } from "react";

function BookList({ books, setBooks }) {
    const [editingBook, setEditingBook] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch("/api/books");
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch("/api/books", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            if (response.ok) {
                setBooks(books.filter((book) => book._id !== id));
                alert("Book deleted successfully!");
            } else {
                alert(result.error || "Failed to delete the book.");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleUpdate = async (updatedBook) => {
        try {
            const response = await fetch("/api/books", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBook),
            });
            const result = await response.json();
            if (response.ok) {
                setBooks(
                    books.map((book) =>
                        book._id === updatedBook.id ? { ...book, ...updatedBook } : book
                    )
                );
                setEditingBook(null);
                alert("Book updated successfully!");
            } else {
                alert(result.error || "Failed to update the book.");
            }
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Available Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
                    <div
                        key={book._id || index} // Use index as a fallback if _id is missing
                        className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
                            <p className="text-gray-700 mt-2">
                                <strong>Author:</strong> {book.author}
                            </p>
                            <p className="text-gray-700 mt-2">
                                <strong>Published Year:</strong> {book.publishedYear}
                            </p>
                            <p className="text-gray-700 mt-2">
                                <strong>Link:</strong>{" "}
                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    {book.link}
                                </a>
                            </p>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-between">
                            <button
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                                onClick={() => setEditingBook(book)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 font-medium"
                                onClick={() => setShowDeleteConfirmation(book._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* Edit Book Modal */}
            {editingBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-1/3 text-gray-900">
                        <h3 className="text-lg font-bold mb-4">Edit Book</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate({
                                    id: editingBook._id,
                                    title: e.target.title.value,
                                    author: e.target.author.value,
                                    publishedYear: e.target.publishedYear.value,
                                    link: e.target.link.value, // Include link in update
                                });
                            }}
                        >
                            <label className="block mb-2">
                                Title:
                                <input
                                    name="title"
                                    defaultValue={editingBook.title}
                                    className="w-full border border-gray-300 text-gray-400 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Author:
                                <input
                                    name="author"
                                    defaultValue={editingBook.author}
                                    className="w-full border border-gray-300 text-gray-400 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Published Year:
                                <input
                                    name="publishedYear"
                                    type="number"
                                    defaultValue={editingBook.publishedYear}
                                    className="w-full border border-gray-300 text-gray-400 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-4">
                                Link:
                                <input
                                    name="link"
                                    type="url"
                                    defaultValue={editingBook.link}
                                    className="w-full border border-gray-300 text-gray-400 rounded-md p-2"
                                    required
                                />
                            </label>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 mr-2"
                                    onClick={() => setEditingBook(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white rounded-md px-4 py-2"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-lg font-bold mb-4 text-red-500">
                            Are you sure you want to delete this book?
                        </h3>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 mr-2"
                                onClick={() => setShowDeleteConfirmation(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white rounded-md px-4 py-2"
                                onClick={() => {
                                    handleDelete(showDeleteConfirmation);
                                    setShowDeleteConfirmation(null);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookList;
