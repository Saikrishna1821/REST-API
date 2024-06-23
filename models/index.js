const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const db = {
  Sequelize,
  sequelize,
  User: require('./User')(sequelize, Sequelize),
  Contact: require('./Contact')(sequelize, Sequelize),
  Spam: require('./Spam')(sequelize, Sequelize)
};

db.User.hasMany(db.Contact, { as: 'contacts', foreignKey: 'userId' });
db.Contact.belongsTo(db.User, { as: 'user', foreignKey: 'userId' });

module.exports = db;