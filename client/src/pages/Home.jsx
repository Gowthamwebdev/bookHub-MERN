import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import DisplayBook from "../components/renders/DisplayBook";

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
      {loading ? <Loader /> : <DisplayBook books={books} />}
    </div>
  );
};

export default Home;
