import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const user = { username, password };
    axios.post("http://localhost:5000/users/login", user)
      .then(result => {
        console.log(result)
        if (result.data.message === "Login successful!") {
          navigate("/")
        } else {
          navigate("/signup")
          alert("You are not registered to this service")

        }

      })
      .catch(err => console.log(err))
  }


  return (
    <div className="bg-white p-3 rounded w-25">
      <h2><center>Welcome back!</center></h2>
      <form onSubmit={onSubmit}>

        <div className="mb-3">
          <label htmlFor="email">
            <strong>Username</strong>
          </label>
          <input type="text"
            placeholder='Enter Username'
            autoComplete='off'
            name='username'
            className='form-control rounded-0'
            onChange={(e) => setUsername(e.target.value)}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input type="password"
            placeholder='Enter Password'
            name='password'
            className='form-control rounded-0'
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;