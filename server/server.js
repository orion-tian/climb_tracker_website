const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // folder for uploaded images

// MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected \n');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB \n', err);
  });

// Routes
const climbRouter = require('./routes/climbs');
const userRouter = require('./routes/users');
app.use('/climbs', climbRouter);
app.use('/users', userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});