const mongoose = require('mongoose');
const { Schema } = mongoose;

const MyPageSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  profileurl: String,
});

const MyPageModel = mongoose.model('MyPage', MyPageSchema);
module.exports = MyPageModel;
