import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pbYear, setPbYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPbYear(res.data.publishedYear.toString());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while fetching book details");
        setLoading(false);
      });
  }, [id]);

  const handleEditOperation = () => {
    const data = {
      title,
      author,
      publishedYear: pbYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while updating the book");
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? <Loader /> : ""}
      <div>
        <BackButton />
        <h2>Enter book details</h2>
        <label className="text-2xl text-slate-600 font-serif font-bold">
          Book Name :
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />

        <label className="text-2xl text-slate-600 font-serif font-bold">
          Author Name :
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />
        <label className="text-2xl text-slate-600 font-serif font-bold">
          Published Year :
        </label>
        <input
          type="text"
          value={pbYear}
          onChange={(e) => setPbYear(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />
        <button
          className="font-mono font-bold text-center text-teal-300 w-20 h-20 rounded-sm"
          onClick={handleEditOperation}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
