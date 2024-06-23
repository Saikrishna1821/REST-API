const express=require('express');
const router=express.Router();
const spamContacts=require('../controllers/spamController');

router.get('/checkspam',spamContacts.checkSpam);
router.get('/markAsSpam',spamContacts.markSpam);

module.exports=router;
