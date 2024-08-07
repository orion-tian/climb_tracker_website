import { React, useState } from "react";
import Signup from "../components/signup";
import Login from "../components/login";

const Auth = () => {
  const [login, setLogin] = useState(false);
  return (
    // <div className="container d-flex flex-column align-items-center mt-5">
    <div className="container">
      {
        login ? (
          <>
            <Login />
            <small>Don't have an account? <span>
              <button
                type="submit"
                className="btn-success"
                onClick={() => setLogin(false)}>
                SignUp
              </button></span>
            </small>
          </>
        ) : (
          <>
            <Signup />
            <small>Already have an account? <span>
              <button
                type="submit"
                className="btn-success"
                onClick={() => setLogin(true)}>
                Login
              </button></span>
            </small>


          </>

        )}
    </div>
  );
};

export default Auth;