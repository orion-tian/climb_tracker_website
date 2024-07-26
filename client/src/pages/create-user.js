import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing users when the component mounts
    axios.get('http://localhost:5000/users/')
      .then(response => {
        setUsers(response.data.map(user => user.username));
        console.log(users);
      })
      .catch(error => {
        console.log('Error fetching users:', error);
        setError('Error fetching users');
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (users.includes(username)) {
      setError('Username already exists');
      setUsername('');
      return;
    }

    const newUser = { username };
    console.log(newUser);

    // Add the new user
    axios.post('http://localhost:5000/users/add', newUser)
      .then(res => {
        console.log(res.data);
        setUsername('');
        setError('User Added!');
      })
      .catch(error => {
        console.log('Error adding user:', error);
        setError('Error adding user');
      });
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
      <div>{error}</div>
    </div>
  )
}

export default CreateUser;