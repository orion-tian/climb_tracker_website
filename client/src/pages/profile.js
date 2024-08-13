import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
// import PieChart from './PieChart';

import climbService from '../redux/services/climb.service';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [climbs, setClimbs] = useState([]);
  const [error, setError] = useState('');

  if (error) { return <div>{error}</div>; }

  return (
    <div className="Analytics">
      <h1>Pie Chart Example</h1>
      {/* <PieChart /> */}
    </div>

  )
}

export default Profile;