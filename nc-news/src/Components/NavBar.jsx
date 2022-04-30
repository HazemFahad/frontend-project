import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";

function NavBar() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsArr) => {
        setTopics(topicsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <nav>
      <Navbar bg="light" variant="light" expand="sm" collapseOnSelect>
        <Navbar.Brand>
          <Nav.Link as={NavLink} to="/" className="Nav__link">
            NC News
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              eventKey="1"
              to="/post"
              className="Nav__link"
            >
              Post Article
            </Nav.Link>
            <NavDropdown title="Filter By:">
              {topics.map(({ slug, description }) => {
                return (
                  <Nav.Link
                    as={NavLink}
                    to={`/${slug}`}
                    key={`${slug}`}
                    eventKey="1"
                  >
                    {slug}
                  </Nav.Link>
                );
              })}
              <NavDropdown.Divider />
              <Nav.Link
                eventKey="2"
                as={NavLink}
                to="/"
                key="home"
                className="Topic__link"
              >
                Remove Filter
              </Nav.Link>
            </NavDropdown>
            <Nav.Link
              as={NavLink}
              eventKey="2"
              to="/users"
              className="Nav__link"
            >
              {user.username}
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="3" to="/users">
              <img
                src={user.avatar_url}
                className="Nav__Avatar__img"
                alt="Avatar"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}

export default NavBar;
