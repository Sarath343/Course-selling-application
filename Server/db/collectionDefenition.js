const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:String,
    password:String
})
const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    price : Number,
    imageLink:String,
    published:Boolean,
})

const userSChema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId , ref:'Course'}]
})
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course',courseSchema);
const User = mongoose.model('User',userSChema)
module.exports={Admin,Course,User}