import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ClimbsList from "./pages/climbs-list";
import EditClimb from "./pages/edit-climb";
import CreateClimb from "./pages/create-climb";
import Auth from "./pages/auth";


function App() {
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <div className="container">
        {user ? <><Navbar />
          <br />
          <Routes>
            <Route path="/" element={<ClimbsList />} />
            <Route path="/edit/:id" element={<EditClimb />} />
            <Route path="/create" element={<CreateClimb />} />
          </Routes>
        </> : <Auth />}

      </div>

    </BrowserRouter>
  );
}

export default App;
