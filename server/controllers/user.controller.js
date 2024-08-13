const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  await User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ message: 'Error retrieving users', error: err }));
}

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username }).exec();
    console.log(user);
    if (user) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    const createdUser = await newUser.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_KEY, { expiresIn: "2h", });
    return res.status(200).json({ message: "User added!", token, user });
  } catch (err) {
    res.status(400).json({ message: 'Error signing up', error: err });
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "2h", });

    return res.status(200).json({ user: user, accessToken: token });
  } catch (err) {
    res.status(400).json({ message: 'Error during login', error: err });
  }
}

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(user => res.json('User deleted.'))
    .catch(err => res.status(400).json({ message: 'Error deleting user', error: err }));
}