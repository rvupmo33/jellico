import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import BlogPostPage from "./pages/BlogPostPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <br />
    </>
  );
}

export default App;
