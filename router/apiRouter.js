const express = require('express')
const { contactForm } = require('../controller/contact')
const router = express.Router()
require('dotenv').config()
const validateToken = require('../middleware/authenticateAdmin')
const updateProfiePic = require('../controller/uploadprofile')
const updateProjectpic = require('../controller/uploadprojectpiv')
const addnewproject = require('../controller/addnewproject')
const updateProjects = require('../controller/updateprojects')
const validateAdmin = require('../controller/adminlogin')
const updateProfie = require('../controller/updateprofile')
const getResume = require('../controller/downloadresume')
const checkLoginStatus = require('../controller/checkloginstatus')
const fetchMails = require('../controller/fetchmails')
const updateResume = require('../controller/uploadResume')
const sendMail = require('../controller/sendMail')
const updateMailStatus = require('../controller/updateMailStatus')
const deleteProjectById= require('../controller/deleteProject')
router.post('/contact', contactForm)
router.get('/resume/:id', getResume)
router.get('/adminloginstatus', checkLoginStatus)
router.post('/validateadmin',validateAdmin)
router.post('/upload-profilepic', validateToken, updateProfiePic)
router.post('/upload-resume', validateToken, updateResume)
router.post('/upload-projectpic/:id', validateToken, updateProjectpic)
router.post('/project', validateToken, addnewproject)
router.delete('/project/:id', validateToken,deleteProjectById)
router.put('/profile', validateToken, updateProfie)
router.put('/project/:id', validateToken, updateProjects)
// router.get('/mails', validateToken, fetchMails);
router.post('/sendmail', validateToken, sendMail);
router.get('/updatemailstatus/:id', validateToken, updateMailStatus);
router.get('/modestatus', (req,res)=>{
    res.json({status:200,value:req.cookies.mode});
});
router.get('/updatemode/:id', (req,res)=>{
    res.cookie(
        'mode',
        req.params.id ,
        { maxAge: 86400000, httpOnly: true ,overwrite:true}
      )
    res.json({status:200,value:req.params.id});
});
module.exports = router
