const express = require('express');
const mongoose = require('mongoose');
const { Admin, Course } = require('../db/collectionDefenition');
const { authenticateJwt, secret } = require('../authentication/authentication')
const jwt = require('jsonwebtoken')
const router = express.Router();



router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
        res.status(403).json({ message: "Invalid user name or password" });
        return
    }
    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' })
    res.status(200).json({ message: "successfully logged in ", token })

});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: "admin already exists " });
        return
    }
    const obj = { username: username, password: password };
    const adminNew = new Admin(obj)
    await adminNew.save();
    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' })
    res.status(200).send({ message: "saved  new admin", token });

})

router.post('/addCourse', authenticateJwt, async (req, res) => {
    const course = req.body;
    const title = course.title
    const check = await Course.findOne({ title });
    if (check) {
        res.status(400).json({ message: "course already exists " })
        return
    }
    const newCourse = new Course(course);
    await newCourse.save()
    res.status(200).json({ message: "Course added successfully ", id: newCourse.id })

})
router.put('/updateCourse/:id', authenticateJwt, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!course)
            return res.status(403).json({ message: "id deosn't exists" })
        res.status(200).json({ message: "course updated successfully" })
    }
    catch (error) {
        res.status(403).json({ message: "not updated in DB" })
    }

})
router.delete('/removeCourse/:id', authenticateJwt, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (course)
            return res.status(200).json({ message: "successfully deleted", course })
        res.status(403).json({ message: "Couldnt find Id" })
    }
    catch (error) {
        return res.status(403).json({ message: "couldnot process request" })
    }
});

router.get('/getAllCourses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.status(200).json({ message: "Successfully fetched courses", courses })
})

router.get('/getCourseById/:id', authenticateJwt, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course)
            return res.status(200).json({ course })
        res.status(404).json({ message: "course not found" })
    }
    catch (error) {
        res.status(403).json({ message: "couldnot process request " })
    }
})
router.get('/me',authenticateJwt,async (req,res)=>{
    const admin = await  Admin.findOne({username:req.admin.username})
   if(admin ){
    return res.status(200).json({username:admin.username})
   } 
    res.status(403).json({username:null,message:"No admin exists"})
})        
module.exports = router;