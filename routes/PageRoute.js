const express = require('express');
const pageController = require('../controllers/PageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);

module.exports = router;
