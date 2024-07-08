import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ReadBook from "./pages/ReadBook";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLoggedIn &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/details/:id" element={<ReadBook />} />
            <Route path="/books/update/:id" element={<UpdateBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
