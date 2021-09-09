exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getUserPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};
