import { useEffect, useState } from "react";
import { UserContext } from "../Contexts/User";
import { getFullUserData } from "../utils/api";
import { useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";

const Users = () => {
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFullUserData()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1 className="Users__header">Users</h1>
      <ul className="Users__list">
        {users.map((user) => {
          return (
            <li key={user.username} className="Users_card">
              <Card>
                <Card.Header>
                  <img
                    src={user.avatar_url}
                    className="Nav__Avatar__img"
                    alt="Avatar"
                  />
                  {user.username}
                </Card.Header>

                <Button
                  onClick={() => {
                    setUser(user);
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
