import Link from 'next/link'; // Import Link for Next.js routing

const BookList = ({ books }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
                // Correct the link if it starts with 'https://'
                const correctedLink = book.link.startsWith("https://")
                    ? book.link.replace("https://", "http://")
                    : book.link;

                return (
                    <Link href={correctedLink} key={book._id} passHref>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">{book.title}</h3>
                            <p className="text-gray-600">Author: {book.author}</p>
                            <p className="text-gray-500">Published Year: {book.publishedYear}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default BookList;
