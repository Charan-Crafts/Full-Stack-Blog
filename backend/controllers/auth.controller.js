const { json } = require("express");
const userModel = require("../models/user.models")

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

const passwordHashing =  async (rawPassword)=>{

    const salt = await bcrypt.genSalt(10)

    const hashedPassword =  await bcrypt.hash(rawPassword,salt);

    return hashedPassword;
}


const verifyPassword = async (userPassword,encryptedPassword)=>{

    const match = await bcrypt.compare(userPassword,encryptedPassword);

    return match;
}

const generateAccessTokenAndRefreshToken =  (userId)=>{

    const accessToken = jwt.sign({userId:userId}, process.env.ACCESS_TOKEN_SECERT_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})

    const refreshToken = jwt.sign({userId:userId},process.env.REFRESH_TOKEN_SECERT_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})

    return {accessToken,refreshToken};
}

const userRegistration = async(req,res)=>{

    const {userName,password,email} = req.body;

    try {

        // Check the user is exists with the email and userName

        const user = await userModel.findOne({
            $or:[{email} ,{userName}]
        })

        if(user){

            return res.status(400).json({
                success:false,
                message:"User already Exists",
            })
        }

        //Hash the password 
        const hashedPassword =await passwordHashing(password);

        // Now store the user in DB

        const newUser = await userModel.create(
            {email,password:hashedPassword,userName}
        )

        return res.status(201).json({
            success:true,
            message:{
                userId:newUser._id,
                message:"User created"
            }
        })
        
        
    } catch (error) {
        
        console.log("Internal server Error :",error);

        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}


const userLogin =async (req,res)=>{

    const {email,password} =  req.body;

    try {

        // Check the user is exists or not

        const user = await userModel.findOne({email})

        if(!user){

            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid credentails"
                }
            )
        }

        // Compare the password

        const isPassword = await verifyPassword(password,user.password)
        
        if(!isPassword){
            return res.status(401).json({
                success:false,
                message:
                    "Invalid credentails"
                
            })
        }

        const {accessToken,refreshToken} = generateAccessTokenAndRefreshToken(user._id);

        const options ={
            httpOnly:true,
            secure:true
        }

        user.refreshToken = refreshToken;

        await user.save()

        res.cookie("accessToken",accessToken,options)
        res.cookie("refreshToken",refreshToken,options)
        
        return res.status(200).json({
            success:true,
           message:{
            accessToken:accessToken,
            refreshToken:refreshToken
           }
        })

        // Now generate the accessToken and refresh token
    } catch (error) {
        console.log("Internal server error :",error);
        return res.status(500),json(
            {success:false,
            message:error}
        )
    }
}
module.exports ={
    userRegistration,
    userLogin
}