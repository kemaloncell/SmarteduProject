const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.route('/signup').post(authController.createUser); // localhost:3000/users/signup
router.route('/login').post(authController.loginUser); // localhost:3000/users/signup

module.exports = router;
