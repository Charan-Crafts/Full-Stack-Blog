
require("dotenv").config()

const express = require("express")

const DBConnection = require("./db/MongoDB")

const cors = require('cors')

const app = express()

const port = process.env.PORT;

const cookieParser = require("cookie-parser")

DBConnection()

app.use(cors({
    origin:process.env.ORIGIN
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


// Import routes

const authRoutes = require("./routes/auth.routes")

app.use("/api/v1",authRoutes)

app.get("/api/health",(req,res)=>{
    return res.status(200).json({message:"Working"})
})



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
    
})


