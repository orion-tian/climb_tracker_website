const router = require('express').Router();
const usersController = require('../controllers/user.controller');

router.get('/', usersController.getUsers);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.delete('/:id', usersController.deleteUser);

module.exports = router;