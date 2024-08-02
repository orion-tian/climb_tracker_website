import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional component for rendering each row in the table
const Climb = ({ climb, deleteClimb }) => (
  <tr>
    <td>{climb.username}</td>
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

  useEffect(() => {
    axios.get('http://localhost:5000/climbs/')
      .then(response => {
        setClimbs(response.data);
      })
      .catch((error) => {
        console.log('Error fecting climbs:', error);
        setError('Error fetching climbs');
      });
  }, []);

  const deleteClimb = (id) => {
    axios.delete('http://localhost:5000/climbs/' + id)
      .then(res => {
        console.log(res.data);
        setClimbs(climbs.filter(el => el._id !== id));
      })
      .catch((error) => {
        console.log('Error deleting climb:', error);
        setError('Error deleting climbs');
      });
  }

  const climbsList = () => {
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
            <th>Username</th>
            <th>Image</th>
            <th>Description</th>
            <th>Grade</th>
            <th>Attempts</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {climbsList()}
        </tbody>
      </table>
    </div >
  )
}

export default ClimbsList;