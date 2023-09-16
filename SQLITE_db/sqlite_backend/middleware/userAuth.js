// const User=require('../test_sequelize/model/user.model')
// const checkRole = (role) => (req, res, next) => {
//     User.findById(req.user.id, (err, user) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       if (user.role !== role) {
//         return res.status(401).send('Unauthorized');
//       }
//       next();
//     });
//   };
//   module.exports=checkRole
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../App/model/user.model.js');
require('dotenv').config();


const authMiddleware = asyncHandler(async (req, res, next) => {
  const secretKey = "mysecret";
  let token;
  if (req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    console.log('Received token:', token); // Log the token to check its value
    try {
      if (token) {
        const decoded = jwt.verify(token, secretKey); 
        console.log('Decoded token:', decoded); // Log the decoded payload to check its value
        const user = await UserModel.findOne({ where: { id: decoded?.id } });
        req.user = user;
        next();
      }
    } catch (error) {
      console.log('Token verification error:', error);
      throw new Error('Invalid token'); // You may handle this error in a better way
    }
  } else {
    throw new Error('No token attached to this header');  
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await UserModel.findOne({ where: {  email } });
  if (user.role !== 'admin') {
    throw new Error("Vous n'êtes pas un admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
