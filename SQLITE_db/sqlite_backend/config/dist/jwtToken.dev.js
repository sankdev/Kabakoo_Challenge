"use strict";

var jwt = require('jsonwebtoken');

require('dotenv').config(); // Replace with your actual secret key

 
function generateToken(id) {
  var secretKey = "mysecret";
  var token = jwt.sign({
    id: id
  }, secretKey, { 
    expiresIn: '1d'
  }); // Use process.env.JWT_SECRET directly

  return token;
}

module.exports = {
  generateToken: generateToken
};