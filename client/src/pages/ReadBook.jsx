import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ReadBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="px-4">
      <BackButton />
      <div className="text-3xl px-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit px-4">
            <div className="my-4">
              <span className="text-slate-900 text-xl mr-4">Title</span>
              <span className="text-teal-500 text-2xl">{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-slate-900 text-xl mr-4">Author</span>
              <span className="text-teal-500 text-2xl">{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-slate-900 text-xl mr-4">
                Published Year
              </span>
              <span className="text-teal-500 text-2xl">
                {book.publishedYear}
              </span>
            </div>
            <div className="my-4">
              <span className="text-slate-900 text-xl mr-4">Created Time</span>
              <span className="text-teal-500 text-2xl">
                {new Date(book.createdAt).toString()}
              </span>
            </div>
            <div className="my-4">
              <span className="text-slate-900 text-xl mr-4">Last Updated</span>
              <span className="text-teal-500 text-2xl">
                {new Date(book.updatedAt).toString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadBook;
