const express = require('express');
const router = express.Router();
const checkAuthentication = require('../config/passport-local-startegy')



const postsController = require("../controllers/posts_controller");

router.post("/create", checkAuthentication, postsController.create);

module.exports = router;