const db = require('../models');
const validator=require('validator');


//Method to mark a number as spam 
const markSpam = async (req, res) => {
  const { phone,userId} = req.body;
  if(!userId)
    {
      return res.status(400).send({ error: 'UserId should not empty' });
    }
  if (!phone ||!validator.isLength(phone,{min:10,max:10} || !validator.isNumeric(phone))) {
    return res.status(400).send({ error: 'Phone number must be exactly 10 digits and cannot be empty' });
  
 }


  try {
    //find the user existed with given userId
    const user=await db.User.findOne({where:{id:userId}})
    if(!user)
      {
       return  res.status(400).json({
          status:"warning",
          message:"No user existed with given userId"
        })
      }
    // Find if the phone number already exists in the contacts table
    let spamRecord = await db.Contact.findOne({ where: { phone } });
    if (spamRecord) {
      // if existed,Increment the spam count
      spamRecord.markedAsSpam += 1;
      await spamRecord.save();
    } else {
      
      // Create a new spam record
      spamRecord = await db.Contact.create({name:'unknown', phone, markedAsSpam: 1, userId: userId});
    }

    res.send({ message: 'Given  number is marked as spam', spamRecord });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};


const checkSpam = async (req, res) => {
  const { phone } = req.query;
  if (!phone ||!validator.isLength(phone,{min:10,max:10} || !validator.isNumeric(phone))) {
    return res.status(400).send({ error: 'Phone number must be exactly 10 digits and cannot be empty' });
  
 }
  try {
    const result = await db.Contact.findOne({ where: { phone } })
    if (result) {
      res.status(200).json({status:"success",message:`Entered number is a ${result.markedAsSpam>0?`Spam and it is marked as spam by ${result.markedAsSpam} users`:'Not spam number'}`});
    } else {
      res.status(404).json({status:"error",message:"The given number is not existed in contacts database"});
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports={
checkSpam,markSpam
}