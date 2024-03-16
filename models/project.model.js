const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const projectSchema=new Schema({
    project_name:{
        type:String,
        required:[true,"Please add the Name"]
    },
    project_type:{
        type:String,
    },
    project_description:{
        type:String,
    },
    projectspage_heading:{
        type:String
    },
    projectspage_description:{
        type:String
    },
    projectspage_overview:{
        type:String
    },
    projectspage_features:{
        type:Array
    },
    techstack:{
        type:Array
    },
    projectsource_link:{
        type:String
    },
    project_link:{
        type:String
    },
    developers:{
        type:Array
    },
    project_image:{
        type:String
    }
});
const project=mongoose.model('Project',projectSchema);
module.exports=project;