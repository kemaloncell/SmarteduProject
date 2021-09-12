const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  const user = this; // hangi kullanıcı giriş yapıyorsa onu yakala daha sonra hash ile şifreledik
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash; // sonra passwordü hash olarak kayıtediyoruz
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;