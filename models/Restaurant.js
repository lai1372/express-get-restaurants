const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Restaurant extends Model {}

Restaurant.init(
  {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "restaurants",
  }
);

module.exports = Restaurant;
