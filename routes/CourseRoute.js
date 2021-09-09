const express = require('express');
const courseController = require('../controllers/CourseController');

const router = express.Router();

router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
module.exports = router;
