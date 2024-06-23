const express=require('express');
const router=express.Router();
const search=require('../controllers/searchController');

router.get('/searchByName',search.searchByName);
router.get('/searchByPhone',search.searchByPhone);

module.exports=router;