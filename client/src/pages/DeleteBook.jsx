import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((res) => {
        console.error(res);
        setLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center bg-transparent">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl">
          <p>Are you sure want to delete this book!</p>
          <button className="bg-teal-500 w-36 h-12" onClick={handleDelete}>
            yes, delete it
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
