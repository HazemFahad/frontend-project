import { useEffect, useState } from "react";
import { UserContext } from "../Contexts/User";
import { getUsers, getUserByUsername } from "../utils/api";
import { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const Users = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(user);

  useEffect(() => {
    getUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
        getUserByUsername(loggedInUser);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser]);

  useEffect(() => {
    getUserByUsername(loggedInUser)
      .then((userFromApi) => {
        setUser(userFromApi);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser, setUser]);

  return (
    <section>
      <h1 className="Users__header">Users</h1>
      <ul className="Users__list">
        {users.map((user) => {
          return (
            <li key={user.username} className="Users_card">
              <Card>
                <Card.Header>{user.username}</Card.Header>

                <Button
                  onClick={() => {
                    setLoggedInUser(user.username);
                  }}
                >
                  Log Me In
                </Button>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
