const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = 'djhfsjhkfgfsdgd';

exports.createToken = async function (req, res, next) {
  try {
    const { email, pw } = req.body;
    const userDoc = await User.find(request.body);
    console.log(userDoc);
    if (userDoc) {
      const passOk = bcrypt.compareSync(pw, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie('token', token);
            res.status(201).json({
              result: 'ok',
              token,
            });
            console.log(res);
          }
        );
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
