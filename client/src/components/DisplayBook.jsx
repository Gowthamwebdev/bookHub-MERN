import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
const DisplayBook = ({ books }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-1">Author: {book.author}</p>
              <p className="text-gray-700 mb-4">
                Published Year: {book.publishedYear}
              </p>
              <div className="flex justify-between">
                <Link to={`books/details/${book._id}`}>
                  <BsInfoCircle className="text-xl text-green-800" />
                </Link>
                <Link to={`books/update/${book._id}`}>
                  <AiOutlineEdit className="text-xl text-yellow-600" />
                </Link>
                <Link to={`books/delete/${book._id}`}>
                  <BsInfoCircle className="text-xl text-red-600" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayBook;
