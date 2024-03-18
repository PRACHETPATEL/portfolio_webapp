const asyncHandler = require('express-async-handler')
const project = require('../models/project.model')
const objectIdRegex = /^[0-9a-fA-F]{24}$/
const updateProjects = asyncHandler(async (req, res) => {
  let { index, value, number, id } = req.body
  let projectupdate
  if (objectIdRegex.test(req.params.id)) {
    switch (index) {
      case 0:
        projectupdate = await project.findByIdAndUpdate(id, {
          project_name: value
        })
        break
      case 1:
        projectupdate = await project.findByIdAndUpdate(id, {
          project_description: value
        })
        break
      case 2:
        projectupdate = await project.findByIdAndUpdate(id, {
          visiblity: value
        })
        break
      case 3:
        projectupdate = await project.findByIdAndUpdate(id, {
          projectspage_description: value
        })
        break
      case 4:
        projectupdate = await project.findByIdAndUpdate(id, {
          projectsource_link: value
        })
        break
      case 5:
        projectupdate = await project.findByIdAndUpdate(id, {
          projectspage_overview: value
        })
        break
      case 6:
        projectdata = await project.findById(id)
        const featuresarray = projectdata.projectspage_features
        featuresarray[number] = value
        projectupdate = await project.findByIdAndUpdate(id, {
          projectspage_features: featuresarray
        })
        break
      case 7:
        projectdata = await project.findById(id)
        const featuresarrayx = projectdata.projectspage_features
        featuresarrayx.splice(number, 1)
        projectupdate = await project.findByIdAndUpdate(id, {
          projectspage_features: featuresarrayx
        })
        break
      case 8:
        projectdata = await project.findById(id)
        const featuresarrayy = projectdata.projectspage_features
        featuresarrayy[featuresarrayy.length] = ''
        projectupdate = await project.findByIdAndUpdate(id, {
          projectspage_features: featuresarrayy
        })
        break
      case 9:
        projectdata = await project.findById(id)
        const techstack = projectdata.techstack
        techstack.splice(number, 1)
        projectupdate = await project.findByIdAndUpdate(id, {
          techstack: techstack
        })
        break
      case 10:
        projectdata = await project.findById(id)
        const techstackx = projectdata.techstack
        techstackx[techstackx.length] = value
        projectupdate = await project.findByIdAndUpdate(id, {
          techstack: techstackx
        })
        break
      case 11:
        projectupdate = await project.findByIdAndUpdate(id, {
          project_link: value
        })
        break
    }
    return res.json({
      status: 200,
      message: 'Project Updated!!',
      projectupdate: projectupdate
    })
  }
  res.redirect('/')
})
module.exports=updateProjects;
