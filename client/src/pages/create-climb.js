import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Grid, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, TextField, Button } from '@mui/material';

import climbService from '../redux/services/climb.service';

const CreateClimb = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState(0);
  const [attempts, setAttempts] = useState("0");
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
      <form onSubmit={onSubmit}>

        <FormControl fullWidth margin="normal">
          <FormLabel>Choose an image:</FormLabel>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => { setImage(e.target.files[0]) }}
          />
        </FormControl>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="climb"
            loading="lazy"
            style={{ width: '200px', height: 'auto' }}
          />
        )}

        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Grid container spacing={3} margin="normal">
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <TextField
                label="Grade (V-Scale)"
                variant="standard"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <FormLabel>Attempts</FormLabel>
              <RadioGroup
                row
                value={attempts} // Controlled value
                onChange={(e) => setAttempts(e.target.value)}
              >
                <FormControlLabel value="Flash!" control={<Radio />} label="Flash!" />
                <FormControlLabel value="2-5" control={<Radio />} label="2-5" />
                <FormControlLabel value="5-10" control={<Radio />} label="5-10" />
                <FormControlLabel value="10-20" control={<Radio />} label="10-20" />
                <FormControlLabel value="20+" control={<Radio />} label="20+" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <TextField
                label="Date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                value={date.toISOString().split('T')[0]} // Format date as yyyy-mm-dd
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </FormControl>
          </Grid>

        </Grid>

        <div className="d-flex">
          <FormControl className="form-group ms-auto" margin="normal">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Climb
            </Button>
          </FormControl>
        </div>
      </form >
    </div >
  )
}

export default CreateClimb;

