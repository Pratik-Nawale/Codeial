const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller")


console.log("Router loaded")

router.get("/", homeController.homegit );

module.exports = router;

