const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})
router.get("/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})
// Removed the duplicate router.post method without validation

router.post(
    "/",
    [
        check("name").notEmpty().withMessage("Name is required"),
        check("location").notEmpty().withMessage("Location is required"),
        check("cuisine").notEmpty().withMessage("Cuisine is required")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const restaurant = await Restaurant.create(req.body);
        res.json(restaurant);
    }
);
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