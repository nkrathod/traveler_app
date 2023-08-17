import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";

const TicketBooking = (props) => {
  const [busData, setBusData] = useState();
  const [selectSeat, setSelectedSeat] = useState("");
  const [bookingData, setBookingData] = useState({
    fname: "",
    lname: "",
    age: "",
    mobile_no: "",
    emailId: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const bookSeatNo = (seatNo) => {
    busData.totalSeat.forEach((seat, i) => {
      if (seatNo === i) {
        setSelectedSeat(seatNo);
      }
    });
  };

  const bookTickest = () => {
    const booked = busData.totalSeat.map((seat, i) => {
      if (selectSeat === i) {
        console.log(i, " booked", selectSeat);
        return "Booked";
      } else {
        return seat;
      }
    });
    if (props.userData && props.userData.id) {
      const bookData = {
        ...busData,
        ...bookingData,
        userId: props.userData.id,
        totalSeat: JSON.stringify(booked),
        seatNo: selectSeat + 1,
      };
      console.log(bookData);
      axios
        .post("/booking", bookData)
        .then((res) => {
          console.log(res);
          if (res.data && res.data.data) {
            localStorage.setItem("bookingInfo", JSON.stringify(res.data.data));
            setBusData((prevState) => ({
              ...prevState,
              totalSeat: JSON.parse(res.data.data.totalSeat),
            }));
          }
          alert("Your seat Booked successfully");
          window.location = "/booking/bookinginfo";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("bookSeats");
    if (data !== undefined && data !== null) {
      const dataObj = JSON.parse(data);
      setBusData({ ...dataObj, totalSeat: JSON.parse(dataObj.totalSeat) });
    }
  }, []);

  return (
    <div className="adminBackground">
      <h3>Booking Information</h3>
      <div className="form-row">
        <div className="col-6">
          {busData && (
            <div className="user-details form-row col-12">
              <h4 className="user-details-header col-12">Bus Details</h4>
              <p className="col-6">Name: {busData.name}</p>
              <p className="col-6">Date: {busData.busDate}</p>
              <p className="col-6">From: {busData.busFrom}</p>
              <p className="col-6">To: {busData.busTo}</p>
              <p className="col-6">Pickup: {busData.pickUpTime}</p>
              <p className="col-6">Drop: {busData.dropTime}</p>
            </div>
          )}
          <div className="seat-details col-12">
            <div className="form-row">
              {busData &&
                busData.totalSeat &&
                busData.totalSeat.length &&
                busData.totalSeat.map((seat, i) => (
                  <div key={i} className="col-3">
                    {" "}
                    {i + 1}{" "}
                    {seat === "Available" ? (
                      <i
                        className={`fa-solid fa-couch rotate-seat ${
                          selectSeat === i ? "selectedSeat" : ""
                        }`}
                        onClick={() => bookSeatNo(i)}
                      ></i>
                    ) : (
                      <i className="fa-solid fa-couch booked rotate-seat"></i>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-row col-12">
            <div className="col-4"></div>
            <div className="col-4 seat-info">
              Bus Type: {busData && busData.busType}
            </div>
            <div className="col-4 seat-info">
              <div>
                Selected : <i className="fa-solid fa-couch selectedSeat"></i>
              </div>
              <div>
                Available : <i className="fa-solid fa-couch"></i>
              </div>
              <div>
                Booked : <i className="fa-solid fa-couch booked"></i>
              </div>
            </div>
          </div>
          {selectSeat >= 0 && (
            <div className="booking-info col-12">
              <h3>Booking Details</h3>
              <div className="form-row">
                <p className="form-row col-6">
                  <label className="col-4">Firstname: </label>
                  <input
                    name="fname"
                    className="form-control col-7"
                    value={bookingData.fname}
                    onChange={(e) => handleChange(e)}
                  />
                </p>
                <p className="form-row col-6">
                  <label className="col-4">Lastname: </label>
                  <input
                    name="lname"
                    className="form-control col-7"
                    value={bookingData.lname}
                    onChange={(e) => handleChange(e)}
                  />
                </p>
                <p className="form-row col-6">
                  <label className="col-4">Age: </label>
                  <input
                    name="age"
                    className="form-control col-7"
                    value={bookingData.age}
                    onChange={(e) => handleChange(e)}
                  />
                </p>
                <p className="form-row col-6">
                  <label className="col-4">Mobile: </label>
                  <input
                    name="mobile_no"
                    className="form-control col-7"
                    value={bookingData.mobile_no}
                    onChange={(e) => handleChange(e)}
                  />
                </p>
                <p className="form-row col-12">
                  <label className="col-4">Email: </label>
                  <input
                    name="emailId"
                    className="form-control col-7"
                    value={bookingData.emailId}
                    onChange={(e) => handleChange(e)}
                  />
                </p>
                <p className="form-row col-6">
                  <label className="col-4">Seat No: </label>
                  <input
                    name="sno"
                    className="form-control col-7"
                    value={selectSeat + 1}
                  />
                </p>
                <p className="form-row col-6">
                  <label className="col-4">Price: </label>
                  <input name="price" className="form-control col-7" value="" />
                </p>
                <button className="btn btn-danger">Cancel</button>{" "}
                <button className="btn btn-success" onClick={bookTickest}>
                  Book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
