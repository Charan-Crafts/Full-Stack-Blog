const express = require("express")

const router = express.Router()

const authControllers = require("../controllers/auth.controller")


router.post("/registration",authControllers.userRegistration)

router.post("/login",authControllers.userLogin)

module.exports= router