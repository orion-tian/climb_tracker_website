import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import Signup from "./components/signup";
import ClimbsList from "./pages/climbs-list";
import EditClimb from "./pages/edit-climb";
import CreateClimb from "./pages/create-climb";
import Navbar from "./components/navbar.component";
import Home from "./pages/home";

import { clearMessage } from "./redux/actions/message";


function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/climbs" element={<ClimbsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
