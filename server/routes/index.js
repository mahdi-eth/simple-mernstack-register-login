const express = require("express");
const { userLoginController } = require("../controller/login");
const { userRegistritionController } = require("../controller/register");
const router = express.Router();

router.post("/register", userRegistritionController);
router.post("/login", userLoginController);

module.exports = { router };
