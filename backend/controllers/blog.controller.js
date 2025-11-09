
const e = require("express");
const blogModel = require("../models/blog.models")


const {uploadImageIntoCloudinary} = require("../utils/cloudinary")

const addBlog = async (req, res) => {

    const { title, content, image } = req.body

    try {

        // Check if user is logged in or not

        let userId = req.user.userId;

      
        // Extract the image from the req
        const imageLocalPath = req.file.path;


        

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unaouthorized request"
            })
        }
        // try to create the request

        const cloudinaryURL = await uploadImageIntoCloudinary(imageLocalPath)

        const newBlog = await blogModel.create({
            title,userId,imageUrl:cloudinaryURL,content,status:"POSTED"
        })

        return res.status(200).json({
            success:true,
            message:{
                newBlog
            }
        })


    } catch (error) {
        console.log("Internal Sever Error :", error);
        return res.status(500).json({
            success: false,
            message: "Internal Sever"
        })
    }
}


const updateBlog = async(req,res)=>{

    const blogId = req.params.blogId;

    // find the blog

    const {content,title} = req.body;

    try {

        
        const isBlog = await blogModel.findById(blogId)

        if(!isBlog){
            return res.status(401).json({
                success:false,
                message:"Invalid blog Id"
            })
        }

        if(content)  isBlog.content = content
        if(title)  isBlog.title=title;
        await isBlog.save()

        return res.status(200).json({
            success:true,
            message:"Updated"
        })
    } catch (error) {
        console.log("Internal server error :",error);
        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}

const getAllBlog = async(req,res)=>{

    try {
        
        const getAllBlog = await blogModel.find()

        return res.status(200).json({
            success:true,
            message:{
                blogs:getAllBlog
            }
        })

    } catch (error) {
        console.log("Internal server error ",error);
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

const getBlogById = async(req,res)=>{

    try {

        const blogId = req.params.blogId;

        const blog = await blogModel.findById(blogId);

        if(!blog){
            return res.status(400).json({
                success:false,
                message:"Blog not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:blog
        })
        
    } catch (error) {
        console.log("Internal server error ",error);
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

const deleteBlog = async (req,res)=>{

    const blogId = req.params.blogId;

    try {
        
        const blog = await blogModel.findById(blogId);

        if(!blog){
            return res.status(400).json({
                success:false,
                message:"Blog not found"
            })
        }

        await blogModel.deleteOne({_id:blogId})

        return res.status(200).json({
            success:true,
            message:"Deleted"
        })

    } catch (error) {
        console.log("Internal server error ",error);
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}
module.exports = {
    addBlog,
    updateBlog,
    getAllBlog,
    getBlogById,
    deleteBlog
}