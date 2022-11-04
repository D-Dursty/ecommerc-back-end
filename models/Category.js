const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
    category_name:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }  
  },
  {
    sequelize,
  }
);

module.exports = Category;
