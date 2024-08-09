import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Climb from '../components/climbCard';
import climbService from '../redux/services/climb.service';
import '../css/climbCard.css';

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
    <div className='card-container'>
      {ClimbListFunc()}
    </div >
  )
}

export default ClimbsList;