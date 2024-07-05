import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const DeleteBook = () => {
  const { id } = use.params();
  const handleDelete = () => {
    axios.delete("http://localhost:5000:books/").then()
  };
  return (
    <div className="flex items-center justify-center bg-transparent blur-md">
      <button className="bg-teal-500 w-36 h-12" onClick={handleDelete}></button>
    </div>
  );
};

export default DeleteBook;
