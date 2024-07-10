import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ReadBook from "./pages/ReadBook";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import "./App.css";

function App() {
  // useEffect(() => {
  //   if (
  //     !isLoggedIn &&
  //     !["/login", "/signup"].includes(window.location.pathname)
  //   ) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ReadBook />} />
        <Route path="/books/update/:id" element={<UpdateBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  );
}

export default App;
