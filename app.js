const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const pageRoute = require('./routes/PageRoute');
const courseRoute = require('./routes/CourseRoute');
const categoryRoute = require('./routes/CategoryRoute');
const userRoute = require('./routes/UserRoute');
const app = express();

mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB conntected Successfuly');
});
// Template engine
app.set('view engine', 'ejs');

//Global variable
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port => ${port}`);
});
