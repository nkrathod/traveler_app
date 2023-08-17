import React, { useState } from "react";
import axios from "axios";
import "./user.css";

const UserDashboard = (props) => {
  const [msg, setMsg] = useState(false);
  const [serachBus, setSearchBus] = useState({
    pickUp: "",
    drop: "",
    date: "",
  });
  const [searchResult, setSearchResult] = useState([]);

  // checked user accessibility for this page ( component) if not then redirected to usertype dashboard
  if (
    props.userData &&
    props.userData.usertype &&
    props.userData.usertype === "admin"
  ) {
    window.location = "/admin";
  }

  // checked user logged in or not if not then redirected to login
  if (
    props.userData === null ||
    props.userData === undefined ||
    (props.userData !== null && props.userData.isLoggedIn === false)
  ) {
    window.location = "/login";
  }

  // set search field and state data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg(false);
    setSearchBus((prevState) => ({ ...prevState, [name]: value }));
  };

  // search bus and fetch API
  const handleSearchBus = () => {
    console.log(serachBus);
    const body = {
      pickUp: serachBus.pickUp,
      drop: serachBus.drop,
      bookdate: serachBus.date,
    };
    axios
      .post("/searchbus", body)
      .then((res) => {
        if (res && res.data && res.data.results) {
          if (res.data.results && res.data.results.length === 0) {
            setMsg(true);
            alert(res.data.msg);
          }
          setSearchResult(res.data.results);
        }
      })
      .catch((error) => console.log(error));
  };

  const bookSeats = (data) => {
    console.log(data);
    localStorage.setItem('bookSeats', JSON.stringify(data));
    window.location = "/booking";
  };

  return (
    <div className="userBackground">
      <div>
        <h3>
          Welcome{" "}
          {props.userData && props.userData !== null && props.userData.name} ...
        </h3>
        <div className="serach-bus">
          <div className="form-group form-row">
            <label for="inputEmail6" className="col-4">
              From
            </label>
            <input
              type="text"
              name="pickUp"
              className="form-control col-7"
              placeholder="Enter Your Start"
              value={serachBus.pickUp}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group form-row">
            <label for="inputEmail6" className="col-4">
              To
            </label>
            <input
              type="text"
              name="drop"
              className="form-control col-7"
              placeholder="Enter Your Destination"
              value={serachBus.drop}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group form-row">
            <label for="inputEmail6" className="col-4">
              Date:
            </label>
            <input
              type="date"
              name="date"
              className="form-control col-7"
              value={serachBus.date}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleSearchBus}
          >
            Search Bus
          </button>
        </div>
      </div>
      <div className="search-result">
        {searchResult.length > 0 ? (
          <div>
            <h5>Search result</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No. </th>
                  <th scope="col">Bus Name</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Date</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">Drop Time</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Booking</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((item, i) => (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.busFrom}</td>
                    <td>{item.busTo}</td>
                    <td>{item.busDate}</td>
                    <td>{item.pickUpTime}</td>
                    <td>{item.dropTime}</td>
                    <td>Rs. {item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => bookSeats(item)}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h5>Available Buses</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No. </th>
                  <th scope="col">Bus Name</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Date</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">Drop Time</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Booking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Panchvati Travel</td>
                  <td>Pune</td>
                  <td>Nashik</td>
                  <td>10 Aug 2023</td>
                  <td>10:30 PM</td>
                  <td>6:16 AM</td>
                  <td>Rs 540</td>
                  <td>Available</td>
                  <td>
                    <button type="button" className="btn btn-success">
                      Book Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Rahi Travel</td>
                  <td>Pune</td>
                  <td>Sambhaji Nagar</td>
                  <td>11 Aug 2023</td>
                  <td>10:00 PM</td>
                  <td>07:30 AM</td>
                  <td>Rs 700</td>
                  <td>Available</td>
                  <td>
                    <button type="button" className="btn btn-success">
                      Book Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserDashboard;
