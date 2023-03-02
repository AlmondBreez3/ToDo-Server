// const jwt = require('jsonwebtoken');
// const YOUR_SECRET_KEY = 'ohtruhjfgjndfjkgnkjnksgf';
// require('dotenv').config();

// function verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization']
//     const token = req.headers.authorization.split('Bearer ')[1];
//     const decoded = jwt.verify(token, YOUR_SECRET_KEY);

//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })
// };

// exports.verifyToken = verifyToken;
