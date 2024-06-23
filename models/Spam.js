module.exports = (sequelize, DataTypes) => {
    const Spam = sequelize.define('Spam', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    });
    return Spam;
  };