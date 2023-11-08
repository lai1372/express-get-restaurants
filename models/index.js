const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item);
Item.belongsToMany(Menu);

module.exports = { Restaurant, Menu, Item };
