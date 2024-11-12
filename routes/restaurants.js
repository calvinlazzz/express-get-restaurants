const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})
router.get("/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})
router.post("/", async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})
router.put("/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.json(restaurant);
})
router.delete("/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.json({
        message: `Deleted restaurant with id ${req.params.id}`
    });
})

module.exports = router;