import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
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
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">Author</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                PbYear
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(books) && books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-600 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                    {book.publishedYear}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`books/details/${book._id}`}>
                        <BsInfoCircle className="text-xl text-green-800" />{" "}
                      </Link>
                      <Link to={`books/update/${book._id}`}>
                        <AiOutlineEdit className="text-xl text-yellow-600" />{" "}
                      </Link>
                      <Link to={`books/delete/${book._id}`}>
                        <BsInfoCircle className="text-xl text-red-600" />{" "}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-slate-600 rounded-md text-center"
                >
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
