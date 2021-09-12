// roles parametre olarak rolemiddleware'dan geliyor öğretmen veya admin diye eğer öğrenci ise else'e düşer
module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send("You can't do it...");
    }
  };
};
