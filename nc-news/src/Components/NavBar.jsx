import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";

function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <header className="NavBar">
      <nav className="Nav">
        <NavLink to="/" className="Nav__link">
          NC News
        </NavLink>
        <NavLink to="" className="Nav__link">
          Post Article
        </NavLink>
        <NavLink to="/users" className="Nav__link">
          <span>{user.username}</span>
        </NavLink>
        <NavLink to="/users" className="Nav__Avatar__img">
          <img
            src={user.avatar_url}
            className="Nav__Avatar__img"
            alt="Log In"
          />
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
