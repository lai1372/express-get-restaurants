const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Menu extends Model {}

Menu.init({
  title: DataTypes.STRING,
}, {
    sequelize: db,
    modelName: "menu"
});

module.exports = Menu;
