require('dotenv').config();
const app=require('./app');
const sequelize=require('./models');
const db=require('./models/index');
const PORT=process.env.PORT || 4000;



db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync the database:', error);
  });
