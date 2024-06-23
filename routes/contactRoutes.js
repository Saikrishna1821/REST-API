const express=require('express');
const router=express.Router();
const contacts=require('../controllers/contactController');

router.get('/getAllContactsById/:userId',contacts.getContacts);
router.post('/addContact/:userId',contacts.addContact);
module.exports=router;