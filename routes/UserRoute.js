const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your name'), //eğer herhangi bir name girilmemişse

    body('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please enter a password'),
  ],
  authController.createUser
);

router.route('/login').post(authController.loginUser); // localhost:3000/users/signup
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); // localhost:3000/users/dashboard
router.route('/:id').delete(authController.deleteUser);
module.exports = router;
