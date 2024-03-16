const express = require('express')
const { contactForm } = require('../controller/contact')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const admin = require('../models/admin.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const validateToken = require('../middleware/authenticateAdmin')
const project = require('../models/project.model')
const profile = require('../models/profile.model')
router.post('/contact', contactForm)

router.get('/resume/:id', (req, res) => {
  const filePath = path.join(__dirname, '../securefiles', 'resume.pdf') // Path to your secure PDF file
  const stat = fs.statSync(filePath)
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename=prachet_resume.pdf`
  })
  if (req.params.id === process.env.API_KEY) {
    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)
  }
})
router.get('/adminloginstatus', (req, res) => {
  const check = req.cookies.logged_in
  if (check) {
    res.json({ status: 200 })
  } else {
    res.json({ status: 404 })
  }
})
router.post('/validateadmin', async (req, res) => {
  const { username, password } = req.body
  const admindata = await admin.findOne()
  if (username === admindata.username && password === admindata.password) {
    const accessToken = jwt.sign(
      {
        admin: {
          id: admindata.id
        }
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '1440m' }
    )
    res.cookie('token', accessToken, { maxAge: 86400000, httpOnly: true })
    res.cookie(
      'logged_in',
      { value: 'yes' },
      { maxAge: 86400000, httpOnly: true }
    )
    res.json({ status: 200, message: 'Logged In Successfully' })
  } else {
    res.json({ status: 503, message: 'Unauthorized' })
  }
})
router.put('/profile', validateToken, async (req, res) => {
  const {
    index,
    value,
    number,
    name,
    email,
    homepage_heading,
    homepage_description,
    aboutpage_description,
    about,
    skills,
    projectspage_description,
    footer_description,
    links,
    developer
  } = req.body
  let profileupdate
  console.log(index)
  switch (index) {
    case 0:
      profileupdate = await profile.updateOne({ name: value })
      break
    case 1:
      profileupdate = await profile.updateOne({ homepage_heading: value })
      break
    case 2:
      profileupdate = await profile.updateOne({ homepage_description: value })
      break
    case 3:
      profileupdate = await profile.updateOne({ aboutpage_description: value })
      break
    case 4:
      profiledata = await profile.findOne()
      const aboutarray = profiledata.about
      aboutarray[number] = value
      profileupdate = await profile.updateOne({ about: aboutarray })
      break
    case 5:
      profiledata = await profile.findOne()
      const skillsarray = profiledata.skills
      skillsarray[skillsarray.length] = value
      profileupdate = await profile.updateOne({ skills: skillsarray })
      break
    case 6:
      profiledata = await profile.findOne()
      const skillsarrays = profiledata.skills
      if (number >= 0 && number < skillsarrays.length) {
        skillsarrays.splice(number, 1)
      }
      profileupdate = await profile.updateOne({ skills: skillsarrays })
      break
    case 7:
      profileupdate = await profile.updateOne({ footer_description: value })
      break
    case 8:
      profileupdate = await profile.updateOne({ developer: value })
      break
    case 9:
      profiledata = await profile.findOne()
      const linksarray = profiledata.links
      linksarray[number] = value
      profileupdate = await profile.updateOne({ links: linksarray })
      break
    case 10:
      profiledata = await profile.findOne()
      const aboutarrayx = profiledata.about
      aboutarrayx[aboutarrayx.length] = ''
      profileupdate = await profile.updateOne({ about: aboutarrayx })
      break
    case 11:
      profiledata = await profile.findOne()
      const linksarrayx = profiledata.links
      linksarrayx[linksarrayx.length] = ''
      profileupdate = await profile.updateOne({ links: linksarrayx })
      break
    case 12:
      profiledata = await profile.findOne()
      const aboutarrayy = profiledata.about
      if (number >= 0 && number < aboutarrayy.length) {
        aboutarrayy.splice(number, 1)
      }
      profileupdate = await profile.updateOne({ about: aboutarrayy })
      break
    case 13:
      profiledata = await profile.findOne()
      const linksarrayy = profiledata.links
      if (number >= 0 && number < linksarrayy.length) {
        linksarrayy.splice(number, 1)
      }
      profileupdate = await profile.updateOne({ links: linksarrayy })
      break
    case 14:
      profileupdate = await profile.updateOne({
        projectspage_description: value
      })
      break
  }
  res.json({ status: 200, message: 'Updated!!', profileupdate: profileupdate })
  // const profileRecord=await profile.create({
  //     name:name,
  //     email:email,
  //     homepage_heading:homepage_heading,
  //     homepage_description:homepage_description,
  //     aboutpage_description:aboutpage_description,
  //     about:about,
  //     skills:skills,
  //     projectspage_description:projectspage_description,
  //     footer_description:footer_description,
  //     links:links,
  //     developer:developer
  // })
  // if(profileRecord){
  // }
})
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
module.exports = router
