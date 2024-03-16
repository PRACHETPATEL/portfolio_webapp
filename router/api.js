const express=require('express');
const { contactForm } = require('../controller/contact');
const router=express.Router();
const path=require('path');
const fs=require('fs');
router.post("/contact",contactForm);
router.get('/resume/:id',(req,res)=>{
    const filePath = path.join(__dirname, '../securefiles', 'resume.pdf'); // Path to your secure PDF file
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size,
        'Content-Disposition': `attachment; filename=prachet_resume.pdf`
    });
    if(req.params.id===process.env.API_KEY){
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
});
module.exports=router;
