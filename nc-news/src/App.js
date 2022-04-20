import "./App.css";
import NavBar from "./Components/NavBar";
import { UserContext } from "./Contexts/User";
import { useState } from "react";
import Users from "./Components/Users";
import ArticleBlurb from "./Components/ArticleBlurb";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleBlurb />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/:topic" element={<ArticleBlurb />}></Route>
      </Routes>
    </div>
  );
}

export default App;