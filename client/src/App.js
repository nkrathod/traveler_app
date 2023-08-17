import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import UserDashboard from "./components/dashboard/userDashboard";
import AdminDashboard from "./components/dashboard/adminDashboard";
import TicketBooking from "./components/dashboard/ticketBooking";
import BookingInfo from "./components/dashboard/bookingInfo";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <>
      <BrowserRouter>
        <NavBar userData={userData} setUserData={setUserData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route
            path="/register"
            element={<Register setUserData={setUserData} />}
          />
          <Route path="/user" element={<UserDashboard userData={userData} />} />
          <Route
            path="/admin"
            element={<AdminDashboard userData={userData} />}
          />
          <Route
            path="/booking"
            element={<TicketBooking userData={userData} />}
          />
          <Route
            path="/booking/bookinginfo"
            element={<BookingInfo userData={userData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
