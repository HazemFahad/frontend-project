import "./App.css";
import NavBar from "./Components/NavBar";
import { UserContext } from "./Contexts/User";
import { useState } from "react";
import Users from "./Components/Users";
import ArticleBlurb from "./Components/ArticleBlurb";
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    username: "Hazem",
    name: "Hazem",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<ArticleBlurb />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/:topic" element={<ArticleBlurb />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
