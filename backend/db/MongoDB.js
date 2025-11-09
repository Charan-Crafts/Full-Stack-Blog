const mongoose = require('mongoose')

const databaseConnection =async ()=>{

    try {
        
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`)

        console.log("connected to MongoDB");
        
    } catch (error) {
        console.log("MongoDB connection Error :",error);
        
    }
}

module.exports = databaseConnection