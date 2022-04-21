import "./App.css";
import NavBar from "./Components/NavBar";
import Users from "./Components/Users";
import ArticleBlurb from "./Components/ArticleBlurb";
import ArticleFull from "./Components/ArticleFull";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleBlurb />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/:topic" element={<ArticleBlurb />}></Route>
        <Route path="article/:article_id" element={<ArticleFull />}></Route>
      </Routes>
    </div>
  );
}

export default App;
