import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { signup } from '../redux/actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const verifyUsername = (value) => {
  if (value.length < 3 || value.length > 25) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 25 characters.
      </div>
    );
  }
};

const verifyPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Signup = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signup(username, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="bg-white p-3 rounded w-25">
        <h2><center>Create Account</center></h2>

        <Form onSubmit={onSubmit} ref={form}>
          {!successful && (
            <div>
              <div className="form-group mb-3 mt-4">
                <label htmlFor="username"><strong>Username</strong></label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder='Enter Username'
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, verifyUsername]}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <Input
                  type="password"
                  placeholder='Enter Password'
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, verifyPassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary w-100 rounded-0 btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>

  );
};
export default Signup;