import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/auth';

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand ms-5">
        Climb Tracker
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.user.username}
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => dispatch(logout())}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );

}

export default Navbar;