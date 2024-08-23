import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

import climbService from '../redux/services/climb.service';
import '../css/climbCard.css';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [climbs, setClimbs] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    climbService.getClimbsPerUser()
      .then(response => {
        const userClimbs = response.data.find(user => user.username === currentUser.user.username)?.climbs || [];
        setClimbs(userClimbs);

        const climbsDict = {};
        userClimbs.forEach(climb => {
          climbsDict[climb.grade] = (climbsDict[climb.grade] || 0) + 1;
        });

        const chartData = Object.keys(climbsDict).map(key => ({
          value: climbsDict[key],
          label: `V${key}`,
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.log('Error fecting climbs:', error);
        setError('Error fetching climbs');
      });
  }, [currentUser]);

  if (error) { return <div>{error}</div>; }

  return (
    <div className='card'>
      <div className='card-info'><h1>Climbing Grades</h1></div>
      <PieChart
        series={[
          {
            data: data,
          },
        ]}
        width={400}
        height={200}
      />
    </div>

  )
}

export default Profile;