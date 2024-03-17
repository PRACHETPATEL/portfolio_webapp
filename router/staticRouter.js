const express=require('express');
const router=express.Router();
const profile = require('../models/profile.model');
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const project = require('../models/project.model'); 
const validateToken = require('../middleware/authenticateAdmin');
router.get('/',async (req,res)=>{
    const profiledata=await profile.findOne();
    const projectsdetails=await project.find();
    res.render('index', {profiledata:profiledata,projectsdetails:projectsdetails});
})
router.get('/logout',async (req,res)=>{
    if(req.cookies.logged_in){
        res.clearCookie('logged_in');
        res.clearCookie('token');
    }
    res.redirect('/');
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
router.get('/admin',async (req,res)=>{
        res.status(200);
        const check = req.cookies.logged_in
        if (check) {
            return res.redirect("/admin/dashboard");
        }
        const profiledata=await profile.findOne();
        res.render('admin', {profiledata:profiledata});
});
router.get('/admin/dashboard',validateToken,async (req,res)=>{
    res.status(200);
    const profiledata=await profile.findOne();
    const projectsdetails=await project.find();
    res.render('dashboard', {profiledata:profiledata,projectsdetails:projectsdetails});
});
router.get('/admin/dashboard/projectdetails/:id',validateToken,async (req,res)=>{
    if(objectIdRegex.test(req.params.id)){
        res.status(200);
        const profiledata=await profile.findOne();
        const projectsdetails=await project.findById(req.params.id);
        if(projectsdetails){
            res.render('projectdetails', {profiledata:profiledata,projectsdetails:projectsdetails});
        }else{
            res.redirect("/");
        }
    }else{
        res.redirect("/");
    }
});
module.exports=router;