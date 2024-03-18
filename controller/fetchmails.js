const asyncHandler=require('express-async-handler');
const contact = require('../models/contact.model');
const fetchMails=asyncHandler(async (req,res)=>{
    const mails=await contact.find();
    res.json({status:200,mails:mails});
});
module.exports=fetchMails;