
const express = require("express")

const router = express.Router()

const blogController = require("../controllers/blog.controller")

const middleware = require("../middleware/auth.middleware")

const multer = require("../middleware/multer.middleware")

router.post("/add",multer.single("image"),middleware.authMiddleware,blogController.addBlog)

module.exports = router