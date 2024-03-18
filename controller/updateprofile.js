const asyncHandler = require('express-async-handler')
const profile = require('../models/profile.model')

const updateProfie = asyncHandler(async (req, res) => {
  const { index, value, number } = req.body
  let profileupdate
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
  res.json({
    status: 200,
    message: 'Home Page Updated!!',
    profileupdate: profileupdate
  })
})
module.exports = updateProfie
