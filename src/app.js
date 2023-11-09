const express = require("express");
const app = express();
const restaurants = require("../routers/restaurants");

//TODO: Create your GET Request Route Below:
app.use("/restaurants", restaurants);

module.exports = app;
