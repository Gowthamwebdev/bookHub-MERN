import { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateOperation = () => {
    if (!title || !author || !publishedYear) {
      alert("All fields are required");
      return;
    }

    const data = {
      title,
      author,
      publishedYear,
    };

    setLoading(true);
    axios
      .post("http://localhost:5000/books/", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred");
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
          Book Name:{" "}
        </label>
        <input
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />

        <label className="text-2xl text-slate-600 font-serif font-bold">
          Author Name:{" "}
        </label>
        <input
          type="text"
          value={author || ""}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />
        <label className="text-2xl text-slate-600 font-serif font-bold">
          Published Year:{" "}
        </label>
        <input
          type="text"
          value={publishedYear || ""}
          onChange={(e) => setPublishedYear(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 mx-auto"
        />
        <button
          className="font-mono font-bold text-center text-teal-300 w-20 h-20 rounded-sm"
          onClick={handleCreateOperation}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
