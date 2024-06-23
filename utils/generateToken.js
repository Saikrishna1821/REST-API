const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
    expiresIn: '1d'
  });
};

module.exports = generateToken;