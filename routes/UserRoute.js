const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/login').post(authController.loginUser); // localhost:3000/users/signup
router.route('/signup').post(authController.createUser); // localhost:3000/users/signup
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); // localhost:3000/users/dashboard

module.exports = router;
