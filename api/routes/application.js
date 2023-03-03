// import { Router } from 'express';
// import { verifyToken } from '../isAuth';
// const jwtSecret = 'ohtruhjfgjndfjkgnkjnksgf';

// const router = Router();

// router.get('/userInfo', verifyToken, async (req, res) => {
//   const { token } = req.cookies;
//   const authHeader = req.headers['authorization'];
//   console.log(authHeader);
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
