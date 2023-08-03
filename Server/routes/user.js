const express = require('express');
const { User, Course } = require('../db/collectionDefenition')
const { authenticateJwt, secret } = require('../authentication/authentication')
const jwt = require('jsonwebtoken');
//const { default: Courses } = require('../../user-front-end/src/component/Courses');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
        console.log(user);
        return res.status(403).json({ message: "User already exists " })
    }
    const obj = { username, password };
    const newUser = new User(obj);
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' })
    res.status(200).json({ message: "Successfully saved", token })
})
router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const check = await User.findOne({ username, password })
    if (!check)
        return res.status(403).json({ message: "User doesnt exists" });
    const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' })
    res.status(200).json({ token })
})
router.post('/addToCart', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.admin.username })
    if (user) {
        user.wishlist.push(req.body.courseId);
        await user.save();
        return res.status(200).send();
    }
    return res.status(404).json({ message: "invalid User" })
})
router.get('/getCart', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.admin.username })
    if (user) {
        const courses = (await user.populate('wishlist')).wishlist;
        return res.status(200).json({ courses })
    }
    return res.status(404).json({ message: "invalid User" })
})
router.delete('/removeFromCart/:courseId', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.admin.username });
    if (user) {
        const idx = user.wishlist.findIndex(t => t == req.params.courseId);
        if (idx === -1) {
            res.status(404).send();
        } else {
            todos = user.wishlist.splice(idx, 1);
            await user.save();
            const courses = (await user.populate('wishlist')).wishlist;
            return res.status(200).json({ message: "successfully removed ", courses })
        }
    }
    return res.status(403).send({ message: "cannot find user" })

})
router.get('/getPurchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.admin.username })
    if (user) {
        const courses = (await user.populate('purchasedCourses')).purchasedCourses;
        return res.status(200).json({ courses })
    }
    return res.status(404).json({ message: "invalid User" })
})
module.exports = router;
