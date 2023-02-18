const express = require('express');
const router = express.Router();
const checkAuthentication = require('../config/passport-local-startegy')



const commentsController = require("../controllers/comments_controller");

router.post("/create", checkAuthentication, commentsController.create);
router.get("/destroy/:id", checkAuthentication, commentsController.destroy);

module.exports = router;