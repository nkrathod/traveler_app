import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../bus.gif";
import "./home.css";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hideIcon, setHideIcon] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const hideShowPassword = (e) => {
    setHideIcon(!hideIcon);
  };

  const handleLogin = () => {
    const body = {
      email: userName,
      password: password,
    };
    axios
      .post("/login", body)
      .then((response) => {
        console.log(response.data);
        const userData = response.data.data[0];
        const userDataObj = { ...userData, isLoggedIn: true };
        localStorage.setItem("user", JSON.stringify(userDataObj));
        props.setUserData(userDataObj);
        if (userDataObj.usertype === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="loginPage">
      <header className="login-header">
        <div className="form_div">
          <img src={logo} className="login-bus" alt="logo" />
          <h2>Welcome to Travelers App</h2>
          <div className="form-group form-row">
            <label for="inputEmail6" className="col-4">
              Email
            </label>
            <input
              type="email"
              id="inputEmail6"
              className="form-control col-8"
              placeholder="Enter email"
              aria-describedby="emailHelp"
              value={userName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group form-row">
            <label for="inputPassword6" className="col-4">
              Password
            </label>
            <input
              type={hideIcon ? "password" : "text"}
              id="inputPassword6"
              className="form-control col-8"
              aria-describedby="passwordHelpInline"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => handlePassword(e)}
            />
            {hideIcon ? (
              <i
                class="fa-regular fa-eye"
                onClick={hideShowPassword}
                style={{
                  marginLeft: "-38px",
                  marginTop: "18px",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              ></i>
            ) : (
              <i
                class="fa-regular fa-eye-slash"
                onClick={hideShowPassword}
                style={{
                  marginLeft: "370px",
                  marginTop: "-30px",
                  cursor: "pointer",
                  zIndex: 2,
                  color: "#282c34",
                }}
              ></i>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
            <a
              href="/register"
              className="btn btn-primary"
              style={{ marginLeft: "20px" }}
            >
              Register
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Login;
