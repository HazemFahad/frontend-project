import { useEffect, useState } from "react";
import { UserContext } from "../Contexts/User";
import { getUsers, getUserByUsername } from "../utils/api";
import { useContext } from "react";

const Users = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(user);

  useEffect(() => {
    getUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUserByUsername(loggedInUser)
      .then((userFromApi) => {
        setUser(userFromApi);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser, setUser]);

  return (
    <section>
      <h1>Users</h1>
      <ul className="Users__list">
        {users.map((user) => {
          return (
            <li key={user.username} className="Users_card">
              <h2>{user.username}</h2>
              <button
                onClick={() => {
                  setLoggedInUser(user.username);
                }}
              >
                Log Me In
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
