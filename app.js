let express=require('express');
let app=express();
let path=require('path');
const logger=require("morgan");
app.set("view engine","ejs");
app.set('trust proxy', true);
app.use(logger("tiny"));
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname,"./public")));
app.get("/",(req,res)=>{
    res.render('index', { title: 'Welcome to My Website', message: 'Hello, world!' });
})
app.listen(5550,()=>{
    console.log("listening port 5550");
})