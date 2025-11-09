
const express = require("express")

const router = express.Router()

const blogController = require("../controllers/blog.controller")

const middleware = require("../middlewares/auth.middleware")

const multer = require("../middlewares/multer.middleware")

router.post("/add",multer.single("image"),middleware.authMiddleware,blogController.addBlog)

router.put("/update/:blogId",middleware.authMiddleware,blogController.updateBlog)

router.get("/",middleware.authMiddleware,blogController.getAllBlog)

router.get("/:blogId",middleware.authMiddleware,blogController.getBlogById)

router.delete("/:blogId",middleware.authMiddleware,blogController.deleteBlog)


module.exports = router