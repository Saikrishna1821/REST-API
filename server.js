require('dotenv').config();
const app=require('./app');
const sequelize=require('./models');
const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})