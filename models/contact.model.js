const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const contactSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please add the Name"]
    },
    email:{
        type:String,
        required:[true,"Please add the email"]
    },
    message:{
        type:String,
        required:[true,"Please add the message"]
    }
},{
    timestamps:true
});
const contact=mongoose.model('Contact',contactSchema);
module.exports=contact;