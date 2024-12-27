"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookListR";

const Read = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch books based on query
    const fetchBooks = async (query = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams(query);
            const response = await fetch(`/api/books?${params}`);
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error("Failed to fetch books");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all books when the component mounts (or on load if no query)
    useEffect(() => {
        fetchBooks(); // Fetch all books by default when the page loads
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
                BookVerse
            </h1>
            <SearchBar onSearch={fetchBooks} />
            {loading ? (
                <p className="text-center text-gray-500 mt-4">Loading...</p>
            ) : (
                <BookList books={books} />
            )}

        </div>


    );
};

export default Read;
