const express = require("express");
const { userRegistritionController } = require("../controller/register");
const router = express.Router();

router.post("/register", userRegistritionController);
router.post("/login", () => console.log("got the login router"));

module.exports = { router };
