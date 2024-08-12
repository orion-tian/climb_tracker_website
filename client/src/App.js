import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import Signup from "./components/signup";
import ClimbsList from "./pages/climbs-list";
import EditClimb from "./pages/edit-climb";
import CreateClimb from "./pages/create-climb";
import Navbar from "./components/navbar";

import { clearMessage } from "./redux/actions/message";


function App() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
    if (["/login", "/signup"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location.pathname]);

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/climbs" element={<ClimbsList />} />
          <Route path="/edit/:id" element={<EditClimb />} />
          <Route path="/create" element={<CreateClimb />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
