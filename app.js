const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/PageRoute');
const courseRoute = require('./routes/CourseRoute');
const categoryRoute = require('./routes/CategoryRoute');
const app = express();

mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB conntected Successfuly');
});
// Template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port => ${port}`);
});
