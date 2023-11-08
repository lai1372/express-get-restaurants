const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Item extends Model {}

Item.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN,
  },
  {
    sequelize: db,
    modelName: "item",
  }
);

module.exports = Item;
