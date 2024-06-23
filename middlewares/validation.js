const validator = require('validator');

const validateUserInput = (req, res, next) => {
  const { phone, email, password, name } = req.body;
  let errors = [];

  // Validate phone number
  if (!phone ||!validator.isLength(phone,{min:10,max:10} || !validator.isNumeric(phone))) {
    res.status(400).send({ error: 'Phone number must be exactly 10 digits and cannot be empty' });
    return;
 }

  // Validate email
  if (!email || !validator.isEmail(email)) {
    errors.push('Invalid email address');
  }

  // Validate password (at least 8 characters, one uppercase letter, one lowercase letter, and one number)
  if (!password || !validator.isLength(password, { min: 8 }) ||
      !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number');
  }

  // Validate name (not empty and must be a string)
  if (!name || !validator.isLength(name, { min: 1 })) {
    errors.push('Name is required and cannot be empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateUserInput };