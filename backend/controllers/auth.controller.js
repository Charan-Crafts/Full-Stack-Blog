const userModel = require("../models/user.models")

const bcrypt = require("bcryptjs")

const passwordHashing =  async (rawPassword)=>{

    const salt = await bcrypt.genSalt(10)

    const hashedPassword =  await bcrypt.hash(rawPassword,salt);

    return hashedPassword;
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

module.exports ={
    userRegistration
}