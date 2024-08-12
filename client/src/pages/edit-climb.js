import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

import climbService from '../redux/services/climb.service';
import { useSelector } from "react-redux";


const EditClimb = () => {
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const climbResponse = await climbService.getClimb(id);
        const { username, image, description, grade, attempts, date } = climbResponse.data;
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
      };

    };

    fetchData();
  }, [id]);

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
      await climbService.updateClimb(id, formData);
      window.location = '/';
    } catch (error) {
      console.log('Error updating climb: ', error);
      setError('Error updating climb');
    }
  };

  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h3>Edit Climb</h3>
      <form onSubmit={onSubmit}>

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

        <div className="form-group mb-3">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="parent">
          <div className="row">

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="grade">Grade (V-Scale): </label>
                <input
                  id="grade"
                  type="text"
                  className="form-control"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="attempts">Attempts: </label>
                <input
                  id="attempts"
                  type="text"
                  className="form-control"
                  value={attempts}
                  onChange={(e) => setAttempts(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="date">Date: </label>
                <div className="col-md-4 mb-3">
                  <DatePicker
                    id="date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="form-group ms-auto">
                <input
                  type="submit"
                  value="Edit Climb"
                  className="btn btn-primary"
                />
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default EditClimb;