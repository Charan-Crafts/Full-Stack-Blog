const multer = require("multer")

const path = require("path")

const fileSystem = require("fs")

 const folderPath = path.join(__dirname+"../public/temp")

 //if folderpath is not exists create it

 if(!fileSystem.existsSync(folderPath)){
    fileSystem.mkdirSync(folderPath,{recursive:true})
 }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload