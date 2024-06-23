const db = require('../models');
const validator=require('validator');

exports.addContact = async (req, res) => {
  const { name, phone } = req.body;
  if (!phone ||!validator.isLength(phone,{min:10,max:10} || !validator.isNumeric(phone))) {
    res.status(400).send({ error: 'Phone number must be exactly 10 digits and cannot be empty' });
    return;
 }
 if(!name)
  {
    res.status(400).send({ error: 'Name should not be empty' });
    return;
  }
  try {
     //find the user existed with given userId
     const user=await db.User.findOne({where:{id:req.params.userId}})
     if(!user)
       {
        return  res.status(400).json({
           status:"warning",
           message:"No user existed with given userId"
         })
       }
    const contact = await db.Contact.create({ name, phone, userId: req.params.userId});
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//This method is used to find all the contacts of a user using userId
exports.getContacts = async (req, res) => {
  try {
    //find the user existed with given userId
    const user=await db.User.findOne({where:{id:req.params.userId}})
    if(!user)
      {
       return  res.status(400).json({
          status:"warning",
          message:"No user existed with given userId "
        })
      }
    const contacts = await db.Contact.findAll({ where: { userId: req.params.userId } });
    console.log({contacts})
    if(contacts.length==0)
      {
        res.status(301).json({
          status:"warning",
          message:"No contacts were added "
        })
      }
  else
    res.send(contacts);
  } catch (error) {

    res.status(400).send({ error: error.message });
  }
};