import { PropaneSharp } from "@mui/icons-material";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    username: "Hazem",
    name: "Hazem",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
