const express = require("express");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.profile);

router.get("/sign-up", userController.signup);
router.get("/sign-in", userController.signin);

router.post("/create", userController.create)


module.exports = router;