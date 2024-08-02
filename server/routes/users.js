const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.get('/', async (req, res) => {
  await User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      return res.status(409).json('Username already exists.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, password: hashedPassword });

    const createdUser = await newUser.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "User added!", token, user });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json('Login failed.');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json('Login failed.');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful!", token, user });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(user => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;