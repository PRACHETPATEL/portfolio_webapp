const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const profileSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please add the Name"]
    },
    email:{
        type:String,
        required:[true,"Please add the email"]
    },
    homepage_heading:{
        type:String
    },
    homepage_description:{
        type:String
    },
    aboutpage_description:{
        type:String
    },
    about:{
        type:Array
    },
    skills:{
        type:Array,
        required:[true,"Please add the skills"]
    },
    projectspage_description:{
        type:String
    },
    footer_description:{
        type:String
    },
    links:{
        type:Array,
        required:[true,"Please add the Links"]
    },
    developer:{
        type:String
    }
});
const profile=mongoose.model('Profile',profileSchema);
module.exports=profile;