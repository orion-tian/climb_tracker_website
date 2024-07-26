import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateClimb = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch(error => {
        console.log('Error fetching users: ', error);
        setError('Error fetching users');
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const climb = {
      username,
      description,
      grade,
      date,
    };

    console.log(climb);

    axios.post('http://localhost:5000/climbs/add', climb)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log('Error adding climb: ', error);
        setError('Error adding climb');
      });
    // take user back to home page
    window.location = '/';
  };
  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h3>Create New Climb Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Grade (V-Scale): </label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateClimb;

