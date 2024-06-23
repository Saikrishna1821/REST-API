const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const db = require('../models');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ','');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {

    res.status(401).send(error);
  }
};

module.exports = auth;