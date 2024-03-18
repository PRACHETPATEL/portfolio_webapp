const mailsender = require('../config/email-config')
const contact = require('../models/contact.model')
const asyncHandler = require('express-async-handler')
const contactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body
  console.log(name, email, message)
  try {
    const contactrecord = await contact.create({
      name: name,
      email: email,
      message: message,
      replied: false
    })
    const emailData = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: "Contacted At Prachet's Portfolio",
      html: `<h5>Hello ${name},</h5>
            <br>
            <div>Thank you for contacting me at my website. I will reach you out soon regarding ${message}.</div>
            <br>
            <h5>Regards,<br>Prachet Patel.</h5>
        `
    }
    if (contactrecord) {
        const response=await mailsender.sendMail(emailData);
        console.log(`Mail Sent Successfully to ${email}!!`)
      res.json({ status: 200, message: 'Response Recoded!!' })
    }
  } catch (e) {
    res.json({
      status: 200,
      message: 'Response Not Recoded All Fields Are Mendetory!!'
    })
  }
})
module.exports = { contactForm }
