const express = require("express");
const router = express.Router();
const { Restaurant, Menu } = require("../models/index");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantById = await Restaurant.findByPk(id);
  res.json(restaurantById);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const createRestaurant = await Restaurant.create({
    name: body.name,
    location: body.location,
    cuisine: body.cuisine,
  });
  res.json(createRestaurant);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const foundRestaurant = await Restaurant.findByPk(id);
  const addRestaurant = await foundRestaurant.update({
    name: body.name,
    location: body.location,
    cuisine: body.cuisine,
  });
  res.send("Restaurant added");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantFound = await Restaurant.findByPk(id);
  const removed = await restaurantFound.destroy();
  res.json(removed);
});

module.exports = router;
