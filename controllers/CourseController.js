const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
    // res.status(201).json({
    //   status: 'success',
    //   course,
    // });
    res.send('teni kurs oluşturuldu');
  } catch {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
