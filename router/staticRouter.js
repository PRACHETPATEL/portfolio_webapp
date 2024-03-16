const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const profile = require('../models/profile.model');
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const project = require('../models/project.model'); 
router.get('/',async (req,res)=>{
    const profiledata=await profile.findOne();
    const projectsdetails=await project.find();
    res.render('index', {profiledata:profiledata,projectsdetails:projectsdetails});
})
router.get('/projectdetails/:id',async (req,res)=>{
    if(objectIdRegex.test(req.params.id)){
        res.status(200);
        const profiledata=await profile.findOne();
        const projectsdetails=await project.findById(req.params.id);
        if(projectsdetails){
            res.render('projects', {profiledata:profiledata,projectsdetails:projectsdetails});
        }else{
            res.redirect("/");
        }
    }else{
        res.redirect("/");
    }
})
module.exports=router;