const express = require('express');
const mongoose = require('mongoose');
const { Admin , Course } = require('../db/collectionDefenition');
const { authenticateJwt , secret } = require('../authentication/authentication')
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/login', async (req, res) => {
    const {username,password}=req.headers;
    const admin = await Admin.findOne({username,password});
    if(!admin){
        res.status(403).json({message:"Invalid user name or password"});
        return
    }
    const token = jwt.sign({username,role:'admin'},secret,{expiresIn:'1h'})
    res.status(200).json({message:"successfully logged in ",token})
    
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
        res.status(403).json({message:"admin already exists "});
        return
    }
    const obj = { username: username, password: password };
     const adminNew = new Admin(obj)
    await adminNew.save();
    const token = jwt.sign({username,role:'admin'},secret ,{expiresIn:'1h'} )
    res.status(200).send({message:"saved  new admin",token});

})

router.post('/addCourse',authenticateJwt,async(req,res)=>{
    const course = req.body;
    const title = course.title
   const check = await Course.findOne({title});
    if(check){
        res.status(400).json({message:"course already exists "})
        return
    }
    const newCourse = new Course(course);
    await newCourse.save()
    res.status(200).json({message:"Course added successfully " , id:newCourse.id})

})
module.exports = router;