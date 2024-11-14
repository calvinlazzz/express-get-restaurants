const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const router = require('../routes/restaurants');

//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use('/restaurants', router);




module.exports = app;
