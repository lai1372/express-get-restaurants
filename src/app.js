const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantById = await Restaurant.findByPk(id);
  res.json(restaurantById);
});

app.post("/restaurants", async (req, res) => {
  const body = req.body;
  const createRestaurant = await Restaurant.create({
    name: body.name,
    location: body.location,
    cuisine: body.cuisine,
  });
  res.json(createRestaurant)
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const foundRestaurant = await Restaurant.findByPk(id);
  const addRestaurant = await foundRestaurant.update({
    name: body.name,
    location: body.location,
    cuisine: body.cuisine,
  });
});

app.delete("/restaurants/:id", async(req, res)=>{
  const id = req.params.id
  const restaurantFound = await Restaurant.findByPk(id)
  const removed = await restaurantFound.destroy()
  res.json(removed)
})

module.exports = app;
