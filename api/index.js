const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const { mongoose } = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ToDo = require('./models/TodoModel.js');
const todoRouter = require('./routes/TodoRoute');

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// app.get('/userInfo', verifyToken, async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const { name, email, _id } = await User.findById(userData.id);
//       res.json({ name, email, _id });
//     });
//   } else {
//     res.json(null);
//   }
// });

mongoose.connect(process.env.MONGO_URL);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('DB connected!!');
// });

const bcryptSalt = bcrypt.genSaltSync(10);
console.log(bcryptSalt);
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173', //어느 네트워크 기반으로 통신할것인지
  })
);

app.use(express.json());
console.log(process.env.MONGO_URL);
app.get('/test', (req, res) => {
  res.json('test ok Hanbee');
});
app.use(cookieParser());
const jwtSecret = 'ohtruhjfgjndfjkgnkjnksgf';

app.post('/login', async (req, res) => {
  try {
    const { email, pw } = req.body;
    const userDoc = await User.findOne({ email });
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
  }
});

//register
//Xb4zqi1jjI7SwIDL
app.post('/register', async (req, res) => {
  const { name, email, pw } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(pw, bcryptSalt),
    });
    console.log(userDoc);
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});
app.use('/todo', todoRouter);

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split('Bearer ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    req.decoded = jwt.verify(token, jwtSecret);
    console.log(req.decoded);
    return next();
  } catch (error) {
    console.log('error');
  }
  // const user = await User.findOne({ email: ne.email });
  // if (!user) throw error;
  // console.log(user);
  // res.user = {
  //   name: user.name,
  // };

  next();
}

app.get('/userInfo', verifyToken, async (req, res) => {
  console.log('na');
  //const name = req.decoded.name
  //const email =req.decoded.email
  const user = await User.findOne({ email: req.decoded.email });
  // const respo = await User.findById({ id: res.id });
  console.log(user);
  res.json(user);
});

// app.post('/addComment', (req, res) => {
//   const token = req.headers.authorization.split('Bearer ')[1];
//   console.log('token:', token);
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     if (err) throw err;
//     const todo = await ToDo.create({
//       owner: userData.id,
//       todos: req.body.todos,
//     });
//     await todo.save();
//     res.json(todo);
//   });
// });

// app.get('/comment', async (req, res) => {
//   const token = req.headers.authorization.split('Bearer ')[1];
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     const { id } = userData;
//     res.json(await ToDo.find({ owner: id }));
//   });
// });

//delete
app.delete('/deleteComment/:num', verifyToken, async (req, res) => {
  // const token = req.headers.authorization.split('Bearer ')[1];
  // console.log(req.params.num);
  // jwt.verify(token, jwtSecret, {}, async (err, userData) => {

  // });
  const ind = await ToDo.findByIdAndRemove({ _id: req.params.num });
  console.log(ind);
  //ToDo.split(ind, 1);
  //ToDo.deleteOne({ _id: req.params.num });
  res.json('delete suceess');
});

//값수정하기는 맨~나중에 코드 정리까지 끝나면 하자

app.listen(4000);
