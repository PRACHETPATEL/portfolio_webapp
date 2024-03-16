const express=require('express');
const { contactForm } = require('../controller/contact');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const admin = require('../models/admin.model');
require("dotenv").config();
const jwt=require("jsonwebtoken");
// const project = require('../models/project.model');
// const profile = require('../models/profile.model');
router.post("/contact",contactForm);

router.get('/resume/:id',(req,res)=>{
    const filePath = path.join(__dirname, '../securefiles', 'resume.pdf'); // Path to your secure PDF file
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size,
        'Content-Disposition': `attachment; filename=prachet_resume.pdf`
    });
    if(req.params.id===process.env.API_KEY){
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
});
router.get('/adminloginstatus',(req,res)=>{
    const check=req.cookies.logged_in;
    if(check){
        res.json({status:200});
    }else{
        res.json({status:404});
    }
});
router.post('/validateadmin',async (req,res)=>{
    const {username,password}=req.body;
    const admindata=await admin.findOne();
    if(username===admindata.username&&password===admindata.password){
        
        const accessToken = jwt.sign({
            admin: {
              id:admindata.id
            },
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1440m"});
        res.cookie('token',accessToken,{ maxAge: 86400000, httpOnly: true });
        res.cookie('logged_in',{"value":"yes"},{ maxAge: 86400000, httpOnly: true  }); 
        res.json({status:200,message:"Logged In Successfully"});
    }else{
        res.json({status:503,message:"Unauthorized"});
    }
});
// router.post("/profile",async (req,res)=>{
//     const {name,email,homepage_heading,homepage_description,aboutpage_description,about,skills,projectspage_description,footer_description,links,developer}=req.body;
//     // console.log(name,email,message);
//     const profileRecord=await profile.create({
//         name:name,
//         email:email,
//         homepage_heading:homepage_heading,
//         homepage_description:homepage_description,
//         aboutpage_description:aboutpage_description,
//         about:about,
//         skills:skills,
//         projectspage_description:projectspage_description,
//         footer_description:footer_description,
//         links:links,
//         developer:developer
//     })
//     if(profileRecord){
//         res.json({status:200,message:"Response Recoded!!,",profile:JSON.stringify(profileRecord)});
//     }
// });
// router.post("/projects",async (req,res)=>{
//     const {project_name,project_type,project_description,projectspage_heading,projectspage_description,projectspage_overview,projectspage_features,techstack,projectsource_link,project_link,developers}=req.body;
//     // console.log(name,email,message);
//     const projectRecord=await project.create({
//         project_name:project_name,
//         project_type:project_type,
//         project_description:project_description,
//         projectspage_heading:projectspage_heading,
//         projectspage_description:projectspage_description,
//         projectspage_overview:projectspage_overview,
//         projectspage_features:projectspage_features,
//         techstack:techstack,
//         projectsource_link:projectsource_link,
//         project_link:project_link,
//         developers:developers
//     })
//     if(projectRecord){
//         res.json({status:200,message:"Response Recoded!!,",project:JSON.stringify(projectRecord)});
//     }
// });
module.exports=router;
