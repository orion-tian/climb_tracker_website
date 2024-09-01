import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Grid } from '@mui/material';
import { PieChart, BarChart, axisClasses } from "@mui/x-charts";

import climbService from '../redux/services/climb.service';
import '../css/climbCard.css';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [climbs, setClimbs] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    climbService.getClimbsPerUser()
      .then(response => {
        const userClimbs = response.data.find(user => user.username === currentUser.user.username)?.climbs || [];
        setClimbs(userClimbs);

        const climbsDict = {};
        const attemptsDict = { 'Flash!': {}, '2-5': {}, '5-10': {}, '10-20': {}, '20+': {} };
        userClimbs.forEach(climb => {
          climbsDict[climb.grade] = (climbsDict[climb.grade] || 0) + 1;

          if (climb.grade in attemptsDict[climb.attempts]) {
            attemptsDict[climb.attempts][climb.grade] = attemptsDict[climb.attempts][climb.grade] + 1;
          } else {
            attemptsDict[climb.attempts][climb.grade] = 1;
          }
        });

        const chartData = [];
        const barLabels = [];
        for (const key in climbsDict) {
          chartData.push({
            value: climbsDict[key],
            label: `V${key}`,
          });
          barLabels.push({ dataKey: `${key}`, label: `V${key}` });
        }
        setPieData(chartData);
        setBarSeries(barLabels);

        const atemptsData = [];
        for (const key in attemptsDict) {
          attemptsDict[key]['attempts'] = key;
          atemptsData.push(attemptsDict[key]);
        }
        setBarData(atemptsData);
      })
      .catch((error) => {
        console.log('Error fecting climbs:', error);
        setError('Error fetching climbs');
      });
  }, [currentUser]);

  if (error) { return <div>{error}</div>; }

  return (
    <div>
      <h1>{currentUser.user.username}'s Climbs</h1>

      <Grid container spacing={3} margin="normal">
        <Grid item xs={12} sm={4}>
          <div className='card'>
            <div className="card-title"><b>Grades</b></div>
            <div className="card-text">
              <PieChart
                series={[
                  {
                    data: pieData,
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={8}>
          <div className='card'>
            <div className="card-title"><b>Attempts</b></div>
            <div className="card-text">
              <BarChart
                dataset={barData}
                xAxis={[{ scaleType: 'band', dataKey: 'attempts' }]}
                series={barSeries}
                width={500}
                height={300}
              />
            </div>
          </div>
        </Grid>

      </Grid>
    </div>

  )
}

export default Profile;