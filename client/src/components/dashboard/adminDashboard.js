import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = (props) => {
  const [add, setAdd] = useState(false);
  const [allBuses, setAllBuses] = useState([]);
  const [busNumbers, setBusNumbers] = useState("");
  const [addBus, setAddBus] = useState({
    name: "",
    busNo: "",
    pickUpTime: "",
    dropTime: "",
    busfrom: "",
    busto: "",
    busDate: "",
    price: "",
    totalSeats: "",
    busType: "",
    status: "",
  });
  if (
    props.userData &&
    props.userData.usertype &&
    props.userData.usertype !== "admin"
  ) {
    window.location = "/user";
  }
  if (
    props.userData === null ||
    props.userData === undefined ||
    (props.userData !== null && props.userData.isLoggedIn === false)
  ) {
    console.log("user is not logged in", props.userData);
    window.location = "/login";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddBus((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeBusNo = (e) => {
    setBusNumbers(e.target.value);
  };

  const handleAddFrom = () => {
    setAdd(!add);
  };

  const handleSearchBus = (e) => {
    axios
      .post("/searchbus", { busNo: busNumbers })
      .then((res) => {
        console.log(res.data);
        if (res && res.data && res.data.results) {
          if (res.data.results && res.data.results.length === 0) {
            alert(res.data.msg);
          }
          setAllBuses(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    axios
      .post("/addbus", addBus)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.data) {
          const data = res.data.data;
          setAllBuses((prevState) => [...prevState, data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (busId) => {
    console.log(busId);
    if(busId){
      axios
      .delete("/addbus/delete-bus?id="+busId)
      .then((res) => {
        alert("Bus deleted")
        if (res.data && res.data.result) {
          const data = allBuses.filter( bus => bus.id !== busId)
          setAllBuses(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    axios
      .post("/searchbus", {})
      .then((res) => {
        console.log(res.data);
        if (res && res.data && res.data.results) {
          if (res.data.results && res.data.results.length === 0) {
            alert(res.data.msg);
          }
          setAllBuses(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="adminBackground">
      <div>
        <h3>
          Welcome{" "}
          {props.userData && props.userData !== null && props.userData.name},
        </h3>
        <div className="form-row">
          <div className="serach-bus-admin col-6">
            <div className="form-group form-row">
              <label className="col-2">Bus No.</label>
              <input
                type="text"
                name="busNo"
                className="form-control col-6 srchField"
                placeholder="Enter bus number"
                value={busNumbers}
                onChange={(e) => handleChangeBusNo(e)}
              />
              <button
                type="button"
                className="btn btn-warning col-3"
                onClick={handleSearchBus}
              >
                Search Bus
              </button>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="serach-bus-admin col-4 left-card">
            <div className="form-group form-row">
              <label className="col-7">
                {add ? "For Available Buses" : "Register New Bus"}
              </label>
              <button
                type="button"
                className="btn btn-warning col-4"
                onClick={handleAddFrom}
              >
                {add ? "Click Me" : "Add Bus"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="search-result">
        {add ? (
          <div>
            <form>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Travel/Bus Name"
                    value={addBus.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Bus No</label>
                  <input
                    type="text"
                    name="busNo"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter Bus Number"
                    value={addBus.busNo}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Bus Date</label>
                  <input
                    type="date"
                    name="busDate"
                    className="form-control"
                    placeholder="Enter Bus Date"
                    value={addBus.busDate}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>From</label>
                  <input
                    type="text"
                    name="busfrom"
                    className="form-control"
                    placeholder="Enter Start Location"
                    value={addBus.busfrom}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>To</label>
                  <input
                    type="text"
                    name="busto"
                    className="form-control"
                    placeholder="Enter Destination"
                    value={addBus.busto}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>PickUp Time</label>
                  <input
                    type="text"
                    name="pickUpTime"
                    className="form-control"
                    placeholder="Enter Pickup Time"
                    value={addBus.pickUpTime}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Drop Time</label>
                  <input
                    type="text"
                    name="dropTime"
                    className="form-control"
                    placeholder="Enter Drop Time"
                    value={addBus.dropTime}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter Price"
                    value={addBus.price}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Total Seat</label>
                  <input
                    type="text"
                    name="totalSeats"
                    className="form-control"
                    placeholder="Enter Total Number of Seat"
                    value={addBus.totalSeats}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Bus Type</label>
                  <input
                    type="text"
                    name="busType"
                    className="form-control"
                    placeholder="Enter Bus Type"
                    value={addBus.busType}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Status</label>
                  <input
                    type="text"
                    name="status"
                    className="form-control"
                    placeholder="Enter Status"
                    value={addBus.status}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-2">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={handleAddFrom}
                  >
                    Cancel
                  </button>
                </div>
                {/* <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div> */}
                <div className="form-group col-md-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
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
                  <th scope="col">Bus Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBuses &&
                  allBuses.map((item, i) => (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.busFrom}</td>
                      <td>{item.busTo}</td>
                      <td>{item.busDate}</td>
                      <td>{item.pickUpTime}</td>
                      <td>{item.dropTime}</td>
                      <td>{item.price}</td>
                      <td>{item.busType}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary editBtn"
                        >
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
