const express = require('express');
const router = express.Router();
const {
  getMyPage,
  postMyPage,
  putMyPage,
} = require('../controllers/MyPageController');
const jwt = require('jsonwebtoken');

const jwtSecret = 'ohtruhjfgjndfjkgnkjnksgf';
async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split('Bearer ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    req.decoded = jwt.verify(token, jwtSecret);
    console.log(req.decoded);
    return next();
  } catch (error) {
    console.log('tokenerror');
  }
  // const user = await User.findOne({ email: ne.email });
  // if (!user) throw error;
  // console.log(user);
  // res.user = {
  //   name: user.name,
  // };

  next();
}

router.get('/', verifyToken, getMyPage); //기본 루트가 ,myPage
router.post('/save', verifyToken, postMyPage);
router.put('/change', verifyToken, putMyPage);

module.exports = router;
