const asyncHandler = require('express-async-handler')
const project = require('../models/project.model')
const objectIdRegex = /^[0-9a-fA-F]{24}$/
const path = require('path')
const deleteProjectById = asyncHandler(async (req, res) => {
  if (objectIdRegex.test(req.params.id)) {
    const response = await project.findByIdAndDelete(req.params.id)
    let filePath = path.join(
      __dirname,
      '../public/assets/' + response.project_image
    )
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
        if (err) {
          console.error('Error deleting file:', err)
        } else {
          console.log('File deleted successfully')
        }
      })
    } else {
      console.log('File does not exist')
    }
    if (response)
      return res.json({
        status: 200,
        message: 'project deleted successfully!!'
      })
    return res.json({ status: 400, message: 'project not deleted' })
  } else {
    res.redirect('/')
  }
})
module.exports = deleteProjectById
