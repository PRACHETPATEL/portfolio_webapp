const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const profile = require('../models/profile.model');
router.get('/',async (req,res)=>{
    const profiledata=await profile.findOne();
    res.render('index', {profiledata:profiledata});
})
router.get('/projectdetails',(req,res)=>{

})
module.exports=router;