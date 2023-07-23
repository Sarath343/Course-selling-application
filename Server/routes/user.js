const express = require('express');
const { User } = require('../db/collectionDefenition')
const { authenticateJwt, secret } = require('../authentication/authentication')
const jwt = require('jsonwebtoken')
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
router.post('/login',async (req,res)=>{
    const {username,password}= req.headers;
    const check = await User.findOne({username,password})
    if(!check)
    return res.status(403).json({message:"User doesnt exists"});
    const token = jwt.sign({username,role:'user'},secret,{expiresIn:'1h'})
    res.status(200).json({token})
}
)

module.exports = router;
