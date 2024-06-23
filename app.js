require('dotenv').config();
const express=require('express');
const userRoutes=require('./routes/userRoutes');
const contactRoutes=require('./routes/contactRoutes');
const spamRoutes=require('./routes/spamRoutes');
const searchRoutes=require('./routes/searchRoutes');
const authMiddleware=require('./middlewares/auth')

const app=express();
app.use(express.json());

app.use('/user',userRoutes);
app.use(authMiddleware)
/*The below routes required authentication instead of passing for every route ,
 just passing  on the top of them it will be applied to each route */
app.use('/contacts',contactRoutes);
app.use('/spam',spamRoutes);
app.use('/search',searchRoutes);


module.exports=app;