const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const Item = require("./Item");

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Menu.belongsToMany(Item, { through: "MenuItems" });
Item.belongsToMany(Menu, { through: "MenuItems" });

module.exports = { Restaurant, Menu, Item };
