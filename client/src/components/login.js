import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from '../redux/actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login() {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/climbs");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/climbs" />;
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="bg-white p-3 rounded w-25">
        <h2><center>Welcome back!</center></h2>

        <Form onSubmit={onSubmit} ref={form}>
          <div className="form-group mb-3 mt-4">
            <label htmlFor="username"><strong>Username</strong></label>
            <Input type="text"
              placeholder='Enter Username'
              autoComplete='off'
              name='username'
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <Input
              type="password"
              placeholder='Enter Password'
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button type='submit' className="btn btn-success w-100 rounded-0" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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

export default Login;