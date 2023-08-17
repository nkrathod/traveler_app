import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../bus.gif";
import "../App.css";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    mobile_no: "",
    email: "",
    password: "",
    usertype: "user",
  });
  const [password, setPassword] = useState();
  const [showError, setShowError] = useState("");
  const [matchPass, setMatchPass] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowError("");
    if (name === "conPassword") {
      setPassword(value);
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const registerUser = () => {
    if (user.password === password) {
      console.log("register => ", user);
      axios
        .post("/signup", user)
        .then((response) => {
          const userData = response.data.data[0];
          const userDataObj = { ...userData, isLoggedIn: true };
          localStorage.setItem("user", JSON.stringify(userDataObj));
          props.setUserData(userDataObj);
          setShowError("");
          if (userDataObj.usertype === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        })
        .catch((err) => {
          console.log(err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.errormsg
          ) {
            setShowError(err.response.data.errormsg);
          } else {
            setShowError(err.errormsg);
          }
        });
      setMatchPass(true);
    }
    if (user.password !== password) {
      setMatchPass(false);
      setShowError("Password does not match");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo-signup" alt="logo" />
        <h3>Register to Travelers</h3>
        <form>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Your Name"
            value={user.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="age"
            className="form-control"
            placeholder="Enter Your Age"
            value={user.age}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="mobile_no"
            className="form-control"
            placeholder="Enter Your Mobile"
            value={user.mobile_no}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="conPassword"
            className="form-control"
            id="conformPassword"
            aria-describedby="conformPassword"
            placeholder="Conform password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
          {showError ? (
            <small className="form-text text-muted errorText">
              {showError}
            </small>
          ) : (
            <small id="conformPassword" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          )}
        </form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={registerUser}
        >
          Submit
        </button>
      </header>
    </div>
  );
};

export default Register;
