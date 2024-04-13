const asyncHandler=require('express-async-handler');
const contact = require('../models/contact.model');
const mailsender = require('../config/email-config');

const sendMail=asyncHandler(async (req,res)=>{
    const {email,message}=req.body;
    const contactrecord=await contact.findById(email);
    const emailData = {
        from:process.env.GMAIL_USERNAME,
        to:contactrecord.email,
        subject: "Visited Prachet's Portfolio",
        html:`
            <h5>Hello ${contactrecord.name},</h5>
            <br>
            <div>${message}</div>
            <div>Thank You.</div>
            <br>
            <h5>Regards,<br>Prachet Patel.</h5>
        `
    }
    contact.findByIdAndUpdate(contactrecord.id,{replied:true}).then(async (responsex)=>{
        const response=await mailsender.sendMail(emailData);
        console.log(`Mail Sent Successfully to ${email}!!`);
        res.json({status:200,message:'Email Sent Successfully!!'});
    })
});
module.exports=sendMail;