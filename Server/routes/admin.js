const express= require('express');
const mongoose = require('mongoose');
const { Admin } = require('../db/collectionDefenition');


const router = express.Router();

router.get('/allAdmins',async (req, res) => {
    const data = await Admin.find({});
    console.log(JSON.stringify(data));
    res.status(200).json({data});
})

module.exports = router;