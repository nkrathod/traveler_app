import React from "react";

const BookingInfo = (props) => {
    const bookingData = JSON.parse(localStorage.getItem("bookingInfo"))
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

  return (
    <div className="">
      <h3>BookingInfo</h3>
      {bookingData && (<div>
        <h4>Firstname: {bookingData.fname} Lastname: {bookingData.lname}</h4>
        <p>Seat No: {bookingData.seatNo}</p>
        <p>Price: {bookingData.price}</p>
      </div>)}
    </div>
  );
};
export default BookingInfo;
