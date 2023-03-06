const jwt = require('jsonwebtoken');
const jwtSecret = 'ohtruhjfgjndfjkgnkjnksgf';
const express = require('express');
const app = express();
const MyPage = require('../models/MyPage');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

module.exports.getMyPage = async (req, res) => {
  console.log(req.decoded);
  const mypage = await MyPage.findOne({ email: req.decoded.email });
  res.json(mypage);
};

module.exports.putMyPage = async (req, res) => {
  const { name, email, profileurl } = req.body;
  console.log(req.decoded.id);
  const myPageDoc = await MyPage.findOne({ email: req.decoded.email }); //왜 아이디로하면 안됨?
  if (myPageDoc !== null) {
    myPageDoc.set({ name, email, profileurl });
    await myPageDoc.save();
    console.log(myPageDoc);
  }
  console.log(myPageDoc);
  res.json(myPageDoc);
};

module.exports.postMyPage = async (req, res) => {
  const { name, email, profileurl } = req.body;
  const myPageDoc = await MyPage.create({ name, email, profileurl });
  console.log(myPageDoc);
  res.json(myPageDoc);
};
