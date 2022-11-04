const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init({
  tag_name:{
    type: DataTypes.STRING,
  }},
  {
    sequelize,
  }
);

module.exports = Tag;
