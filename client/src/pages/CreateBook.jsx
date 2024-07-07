import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsTrash } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="bg-sky-400 text-4xl" /> Add Book
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={book._id}
                className="border border-slate-600 rounded-md p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p className="text-gray-700">Author: {book.author}</p>
                  <p className="text-gray-700">
                    Published Year: {book.publishedYear}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <Link to={`books/details/${book._id}`}>
                    <BsInfoCircle className="text-xl text-green-800" />
                  </Link>
                  <Link to={`books/update/${book._id}`}>
                    <AiOutlineEdit className="text-xl text-yellow-600" />
                  </Link>
                  <Link to={`books/delete/${book._id}`}>
                    <BsTrash className="text-xl text-red-600" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No books available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
