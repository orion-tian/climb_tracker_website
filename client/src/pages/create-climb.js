import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

import climbService from '../redux/services/climb.service';

const CreateClimb = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', currentUser.user.username);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('grade', grade);
    formData.append('attempts', attempts);
    formData.append('date', date);

    try {
      await climbService.createClimb(formData);
      window.location = '/';
    } catch (error) {
      console.log('Error adding climb: ', error);
      setError('Error adding climb');
    }
  };

  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h3>Create New Climb Log</h3>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label>Choose an image: </label>
          <input type="file"
            accept=".png, .jpg, .jpeg"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
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
          <div>
            <DatePicker
              selected={date}
              onChange={(e) => setDate(e)}
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

