import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const NavBar = (props) => {
  const userData = props.userData;
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.setUserData(() => ({ isLoggedIn: false }));
    setShowLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setShowLogin(true);
    }
  }, [userData]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <i className="fa-solid fa-bus"></i>
          Travelers App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          {userData && userData.name && (
            <p style={{ margin: "10px" }}>Hey {userData.name} ...</p>
          )}
          {!showLogin ? (
            <a className="btn btn-outline-success my-2 my-sm-0" href="/login">
              Login
            </a>
          ) : (
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
