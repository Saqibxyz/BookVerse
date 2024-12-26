import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [publishedYear, setPublishedYear] = useState("");

    const handleSearch = () => {
        const query = {
            ...(author && { author }),
            ...(title && { title }),
            ...(publishedYear && { publishedYear }),
        };
        onSearch(query);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <input
                type="text"
                placeholder="Author"
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Year"
                className="input"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="btn bg-blue-500 hover:bg-blue-700 text-white"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
