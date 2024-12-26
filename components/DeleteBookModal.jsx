import React, { useState } from "react";

function DeleteBookModal({ bookId, setBooks, closeModal }) {
    const [successMessage, setSuccessMessage] = useState("");

    const deleteBook = async () => {
        const response = await fetch(`/api/books/${bookId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
            setSuccessMessage("Book deleted successfully!");
            setTimeout(() => {
                setSuccessMessage(""); // Clear the success message after 3 seconds
                closeModal();
            }, 3000);
        } else {
            alert("Failed to delete the book.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete this book? This action cannot be undone.
                </p>
                {successMessage && (
                    <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
                        {successMessage}
                    </div>
                )}
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        onClick={deleteBook}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteBookModal;
