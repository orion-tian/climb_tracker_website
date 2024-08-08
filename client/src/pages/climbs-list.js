import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import climbService from '../redux/services/climb.service';

// functional component for rendering each row in the table
const Climb = ({ climb, deleteClimb }) => (
  <tr>
    <td>
      {climb.image && (
        <img
          src={'http://localhost:5000/' + climb.image}
          alt="climb"
          loading="lazy"
          style={{ width: '200px', height: 'auto' }}
        />
      )}
    </td>
    <td>{climb.description}</td>
    <td>{climb.grade}</td>
    <td>{climb.attempts}</td>
    <td>{climb.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + climb._id}>edit</Link> |
      <a href="#" onClick={() => { deleteClimb(climb._id) }}>delete</a>
    </td>
  </tr>
)

const ClimbsList = () => {
  const [climbs, setClimbs] = useState([]);
  const [error, setError] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    climbService.getClimbsPerUser()
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].username === currentUser.user.username) {
            setClimbs(response.data[i].climbs)
          }
        }
      })
      .catch((error) => {
        console.log('Error fecting climbs:', error);
        setError('Error fetching climbs');
      });
  }, []);

  const deleteClimb = (id) => {
    climbService.deleteClimb(id)
      .then(res => {
        console.log(res.data);
        setClimbs(climbs.filter(el => el._id !== id));
      })
      .catch((error) => {
        console.log('Error deleting climb:', error);
        setError('Error deleting climbs');
      });
  }

  const ClimbListFunc = () => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    climbs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return climbs.map(currClimb => {
      return <Climb
        climb={currClimb}
        deleteClimb={deleteClimb}
        key={currClimb._id} />;
    })
  }

  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h3>Logged Climbs</h3>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Grade</th>
            <th>Attempts</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ClimbListFunc()}
        </tbody>
      </table>
    </div >
  )
}


export default ClimbsList;