const nodemailer=require('nodemailer');

const mailsender=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.GMAIL_USERNAME,
        pass:process.env.GMAIL_AUTH_KEY
    }
});
module.exports=mailsender;