let express=require('express');
let app=express();
require('dotenv').config();
const connectDB = require("./db/connectDB");
let path=require('path');
const logger=require("morgan");
const errorHandler = require('./middleware/errorHandler');
const contact = require('./models/contact.model');
connectDB();
app.set("view engine","ejs");
app.use(express.json());
app.set('trust proxy', true);
app.use(logger("tiny"));
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname,"./public")));
app.get("/",(req,res)=>{
    res.render('index', { title: 'Welcome to My Website', message: 'Hello, world!' });
});
app.post('/api/contact',async (req,res)=>{
    const {name,email,message}=req.body;
    console.log(name,email,message);
    const contactrecord=await contact.create({
        name:name,
        email:email,
        message:message
    })
    if(contactrecord){
        res.json({status:200,message:"Response Recoded!!"});
    }

})
app.use(errorHandler);
app.get("*",(req, res) => {
    res.status(404);
    res.render("error",{title:"Not Found",message:"Url Not Found!!",d1:4,d2:0,d3:4});
});
app.listen(process.env.PORT,()=>{
    console.log("listening port 5550");
})