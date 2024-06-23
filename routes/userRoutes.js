const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware=require('../middlewares/validation')

router.post('/register',validationMiddleware.validateUserInput,userController.register);
router.post('/login', userController.login);

module.exports = router;