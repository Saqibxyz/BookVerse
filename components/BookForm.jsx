import React, { useState } from "react";

function BookForm({ setBooks }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [link, setLink] = useState(""); // New field for the link

    const addBook = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            publishedYear: parseInt(publishedYear),
            link, // Include the link field
        };

        const response = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook),
        });

        if (response.ok) {
            const result = await response.json();
            setBooks((prevBooks) => [...prevBooks, { ...newBook, _id: result.insertedId }]);
            setTitle("");
            setAuthor("");
            setPublishedYear("");
            setLink(""); // Clear the link field
        } else {
            alert("Failed to add the book. Make sure all fields are filled correctly.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Add a New Book</h2>
            <form onSubmit={addBook}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        className="border rounded-lg w-full p-2 text-gray-700 italic"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        className="border rounded-lg w-full p-2 text-gray-700 italic"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Published Year
                    </label>
                    <input
                        type="number"
                        className="border rounded-lg w-full p-2 text-gray-700 italic"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Link
                    </label>
                    <input
                        type="url"
                        className="border rounded-lg w-full p-2 text-gray-700 italic"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default BookForm;
