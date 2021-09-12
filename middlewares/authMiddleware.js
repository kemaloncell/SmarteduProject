// eğer son kullanıcı yetkisi olmayan bir linke ulaştığı zaman girişe gönder
const User = require('../models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    next(); // route dan geldikten sonra tekrar yönlendir
  });
};
