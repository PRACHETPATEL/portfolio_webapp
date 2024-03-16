let express=require('express');
let app=express();
require('dotenv').config();
const connectDB = require("./db/connectDB");
let path=require('path');
const logger=require("morgan");
const errorHandler = require('./middleware/errorHandler');
const apiRouter=require('./router/apiRouter');
const staticRouter=require('./router/staticRouter');
connectDB();
app.set("view engine","ejs");
app.use(express.json());
app.set('trust proxy', true);
app.use(logger("tiny"));
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname,"./public")));
app.use("/",staticRouter);
app.use('/api',apiRouter);
app.use(errorHandler);
app.get("*",(req, res) => {
    res.status(404);
    res.render("error",{title:"Not Found",message:"Url Not Found!!",d1:4,d2:0,d3:4});
});
app.listen(process.env.PORT,()=>{
    console.log("listening port 5550");
})