import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditClimb = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const climbResponse = await axios.get('http://localhost:5000/climbs/' + id);
        const { username, image, description, grade, attempts, date } = climbResponse.data;
        setUsername(username);
        setImage(image);
        setDescription(description);
        setGrade(grade);
        setAttempts(attempts);
        setDate(new Date(date));

        if (image) {
          setImgSrc('http://localhost:5000/' + image);
        }
      } catch (error) {
        console.log('Error fetching climb data: ', error);
        setError('Error fetching climb data');
      }

      try {
        const usersResponse = await axios.get('http://localhost:5000/users/');
        setUsers(usersResponse.data.map(user => user.username));
      } catch (error) {
        console.log('Error fetching users: ', error);
        setError('Error fetching users');
      }

    };

    fetchData();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('grade', grade);
    formData.append('attempts', attempts);
    formData.append('date', date);

    try {
      await axios.patch('http://localhost:5000/climbs/update/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location = '/';
    } catch (error) {
      console.log('Error updating climb: ', error);
      setError('Error updating climb');
    }
  };

  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h3>Edit Climb Log</h3>
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
          <label>Choose an image: </label>
          <input type="file"
            accept=".png, .jpg, .jpeg"
            className="form-control"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImgSrc(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {image && (
          <img
            src={imgSrc}
            alt="climb"
            loading="lazy"
            style={{ width: '200px', height: 'auto' }}
          />
        )}

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
          <label>Attempts: </label>
          <input
            type="text"
            className="form-control"
            value={attempts}
            onChange={(e) => setAttempts(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={(e) => setDate(e)}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Climb Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditClimb;