const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID, // hangi kullanıcı o an için login durumda ise onu yakaldık
    });
    req.flash('success', `Course of ${course.name} has been created successfully`);
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', `Something Happend!`);
    res.status(400).redirect('/courses');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search; //courses sayfasındaki inputun name search olduğu için search yazdık

    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }
    if (!query && !categorySlug) {
      filter.name = '';
      filter.category = null;
    }

    const courses = await Course.find({
      $or: [{ name: { $regex: '.*' + filter.name + '.*', $options: 'i' } }, { category: filter.category }],
    })
      .sort('-createdAt')
      .populate('user');
    const categories = await Category.find();
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const categories = await Category.find();
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate('user');
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      categories,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID); // ilgili userı bul
    await user.courses.push({ _id: req.body.course_id }); //userin kurslar alanına yeni bir kurs yerleştirdik
    await user.save(); // işlemlerin sıra ile gitemesi için await kullandım ve kullanıcıyı kaydet

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID); // ilgili userı bul
    await user.courses.pull({ _id: req.body.course_id }); //userin kurslar alanına yeni bir kurs yerleştirdik
    await user.save(); // işlemlerin sıra ile gitemesi için await kullandım ve kullanıcıyı kaydet

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash('error', `Course of ${course.name} has been removed successfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
