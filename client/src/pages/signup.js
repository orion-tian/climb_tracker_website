import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password };
    axios.post('http://localhost:5000/users/signup', newUser)
      .then(res => {
        console.log(res.data);
        navigate('/login');
      })
      .catch(error => {
        console.log('Error signing up:', error);
        alert('Error signing up');
      });
  };

  return (
    < div className="bg-white p-3 rounded w-25" >
      <h2><center>Create Account</center></h2>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Username</strong>
          </label>
          <input type="text"
            placeholder='Enter Username'
            autoComplete='off'
            name='email'
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
          Sign Up
        </button>
      </form>

    </div >
  );
};

export default Signup;