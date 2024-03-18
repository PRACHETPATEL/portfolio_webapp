const asyncHandler = require('express-async-handler')
const admin = require("../models/admin.model");
const jwt = require('jsonwebtoken')
const validateAdmin=asyncHandler(async (req, res) => {
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
      return res.json({ status: 200, message: 'Logged In Successfully' })
    }
    res.json({ status: 503, message: 'Unauthorized' })
  })
module.exports=validateAdmin;