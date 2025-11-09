const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,   // Cloudinary URL
        
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","POSTED","FAILED"],
        default:"PENDING"
    }

},{timestamps:true})

const blog = mongoose.model("Blog",blogSchema)

module.exports = blog;