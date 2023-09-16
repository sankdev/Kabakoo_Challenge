const jwt = require('jsonwebtoken');
require('dotenv').config();
 // Replace with your actual secret key
  
function generateToken(id) { 
  const secretKey = "mysecret"
  const token = jwt.sign({ id }, secretKey, { expiresIn: '1d' }); // Use process.env.JWT_SECRET directly
  return token;
}
function verifyToken(token) {
  try {
    const secretKey = "mysecret"; // Replace with the same secret key used for signing
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    // Handle invalid or expired tokens here
    console.error(error.message);
    return null;
  }
}

module.exports = {generateToken,verifyToken};
   