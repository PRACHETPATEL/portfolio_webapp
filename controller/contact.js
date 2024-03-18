
const contact = require('../models/contact.model');
const asyncHandler = require('express-async-handler')
const contactForm=asyncHandler(async (req,res)=>{
    const {name,email,message}=req.body;
    console.log(name,email,message);
    try{
        const contactrecord=await contact.create({
            name:name,
            email:email,
            message:message
        })
        if(contactrecord){
            res.json({status:200,message:"Response Recoded!!"});
        }
    }catch(e){
        res.json({status:200,message:"Response Not Recoded All Fields Are Mendetory!!"});
    }
    

});
module.exports={contactForm};