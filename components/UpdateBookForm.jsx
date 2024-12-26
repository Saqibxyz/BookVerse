import React, { useState } from "react";

function UpdateBookForm({ book, setBooks }) {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [publishedYear, setPublishedYear] = useState(book.publishedYear);
    const [successMessage, setSuccessMessage] = useState("");

    const updateBook = async (e) => {
        e.preventDefault();
        const updatedBook = { title, author, publishedYear: parseInt(publishedYear) };

        const response = await fetch(`/api/books/${book._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
            setBooks((prevBooks) =>
                prevBooks.map((b) => (b._id === book._id ? { ...updatedBook, _id: b._id } : b))
            );
            setSuccessMessage("✅ Book updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000); // Clear the success message after 3 seconds
        } else {
            setSuccessMessage("❌ Failed to update the book."); // Show error feedback
            setTimeout(() => setSuccessMessage(""), 3000); // Clear the error message after 3 seconds
        }
    };

    return (
        <form onSubmit={updateBook} className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="text-xl font-bold mb-4">Update Book</h3>
            {successMessage && (
                <div
                    className={`mb-4 flex items-center p-4 rounded-lg shadow-md ${successMessage.includes("successfully")
                        ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                        : "bg-red-100 border-l-4 border-red-500 text-red-700"
                        }`}
                >
                    <span className="mr-2">
                        {successMessage.includes("successfully") ? "🎉" : "⚠️"}
                    </span>
                    <span>{successMessage}</span>
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    type="text"
                    className="border rounded-lg w-full p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Author</label>
                <input
                    type="text"
                    className="border rounded-lg w-full p-2"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Published Year</label>
                <input
                    type="number"
                    className="border rounded-lg w-full p-2"
                    value={publishedYear}
                    onChange={(e) => setPublishedYear(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                Update
            </button>
        </form>
    );
}

export default UpdateBookForm;
