import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ClimbsList from "./pages/climbs-list";
import EditClimb from "./pages/edit-climb";
import CreateClimb from "./pages/create-climb";
import CreateUser from "./pages/create-user";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ClimbsList />} />
          <Route path="/edit/:id" element={<EditClimb />} />
          <Route path="/create" element={<CreateClimb />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
