const express = require("express")

const router = express.Router()

const authControllers = require("../controllers/auth.controller")

const middleware = require("../middlewares/auth.middleware")

router.post("/registration",authControllers.userRegistration)

router.post("/login",authControllers.userLogin)

router.post("/logout",middleware.authMiddleware,authControllers.userLogout)

module.exports= router