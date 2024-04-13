const express = require('express');
const multer = require('multer');
const path = require('path');
const asyncHandler = require('express-async-handler');
const project = require('../models/project.model');
let filenamex;
const storage = multer.diskStorage({
    destination:path.join(__dirname , "../public/assets/"),
    filename: function (req, file, cb) {
        // Use the desired filename
        const filename = filenamex;
        cb(null, filename);
    }
});

const fileFilter = function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() !== '.webp') {
        return cb(new Error('Invalid file format. Only webp files are allowed.'));
    }
    cb(null, true);
};

const limits = {
    fileSize: 100000
};
const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter, 
    limits: limits 
});

let addnewproject=asyncHandler(async (req, res) => {
    const response=await project.find();
    filenamex="project"+(response.length+1)+".webp";
    upload.single('project_image')(req, res,async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ status: 400, message: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, message: 'No file uploaded.' });
        }
        const features=req.body.projectspage_features.split(', ');
        const techstack=req.body.techstack.split(', ');
        const developers=req.body.developers.split(', ');
        const projectdata=await project.create({
            project_name:req.body.project_name,
            project_type:req.body.project_type,
            project_description:req.body.project_description,
            projectspage_heading:req.body.projectspage_heading,
            projectspage_description:req.body.projectspage_description,
            projectspage_overview:req.body.projectspage_overview,
            projectspage_features:features,
            techstack:techstack,
            projectsource_link:req.body.projectsource_link,
            project_link:req.body.project_link,
            developers:developers,
            visiblity:req.body.visiblity,
            project_image:filenamex
        });
        res.status(200).json({ status: 200, message: 'File uploaded successfully.',project:projectdata });
    });
});
module.exports=addnewproject;

