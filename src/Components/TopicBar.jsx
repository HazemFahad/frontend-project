import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../utils/api";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function TopicBar() {
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
    <section>
      <Navbar>
        <Nav>
          <NavDropdown title="Filter By:">
            {topics.map(({ slug, description }) => {
              return (
                <Nav.Link
                  as={NavLink}
                  to={`/${slug}`}
                  key={`${slug}`}
                  className="Topic__link"
                >
                  {slug}
                </Nav.Link>
              );
            })}
            <NavDropdown.Divider />
            <Nav.Link as={NavLink} to="/" key="home" className="Topic__link">
              Remove Filter
            </Nav.Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    </section>
  );
}

export default TopicBar;
