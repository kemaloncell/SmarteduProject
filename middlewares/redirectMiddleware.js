// Pages that are requested to be blocked from the url after the user logs in, for example the login page
module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};
