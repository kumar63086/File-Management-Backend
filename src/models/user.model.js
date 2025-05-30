const mongoose=require("mongoose")
const validator =require('validator')
const userSchema= new mongoose.Schema({
 name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
     select: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})



module.exports= mongoose.model("User",userSchema)