
const { Op } = require('sequelize');
const db = require('../models'); 


const searchByPhone = async (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).send({ error: 'Phone number is required' });
  }

  try {
    // Search for a registered user with the exact phone number
    const registeredUser = await db.User.findOne({
      where: {
        phone: phone
      }});

    if (registeredUser) {
      return res.send(registeredUser)
    }
    else{
      const contact = await db.Contact.findAll({
        where: {
          phone: phone
        }
      });
      if(contact.length==0)
        return res.status(400).json({
      status:"error",
      message:"The given number is neither registered user nor a contact of anyuser"
      })
      res.send(contact)
    }
  
  } catch (error) {
    console.error('Error searching by phone:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const searchByName = async (req, res) => {
  const { name } = req.query;
  console.log({name})
  try {
    // Search for users whose names start with the search query
    const startWithResults = await db.Contact.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`
        }
      }
    });
    // Search for users whose names contain the search query but do not start with it
    const containResults = await db.Contact.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
          [Op.notLike]: `${name}%`
        }
      }
    });

    // Combine the results, startWithResults first, followed by containResults
    const results = [...startWithResults, ...containResults];
    if(results.length==0)
      {
        res.status(400).json({
          status:"warning",
          message:"No results are matching with given name"
        })
      }
    // Send response
    else{
      res.status(200).json(results)
    }
    
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports={
  searchByPhone,searchByName
}