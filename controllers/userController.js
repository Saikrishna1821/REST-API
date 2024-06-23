const bcrypt = require('bcrypt');
const db = require('../models');
const validator=require('validator')
const generateToken = require('../utils/generateToken');


//Register the user with given credentials
const register = async (req, res) => {
  const { name, phone, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ name, phone, password: hashedPassword, email });
    const token = generateToken(user);
    res.status(201).send({ user, token });
  } catch (error) {
    console.log({error})
    if(error.parent.errno==1062)
      {
        res.status(400).json({
          status:"warning",
          message:"The given number is already existed "
        })
      }
      else
    res.status(400).send({ error});
  }
};

//login functionality for user , token will be generated if user is registered  user
const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone ||!validator.isLength(phone,{min:10,max:10} || !validator.isNumeric(phone))) {
     res.status(400).send({ error: 'Phone number must be exactly 10 digits and cannot be empty' });
     return;
  }
  if(!password)
  {
    res.status(400).send({ error: 'password should not empty' });
    return;
  }
  try {
    const user = await db.User.findOne({ where: { phone } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid login credentials');
    }
    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports={register,login};