window.addEventListener('load',()=>{
    const loader=document.getElementById('loader');
    const content=document.getElementById('content');
    const api=location.protocol+"//"+ location.hostname+":"+location.port;
    let showLoader=()=>{
        content.classList.add('d-none');
        content.classList.remove('d-block');
        loader.classList.add('d-flex');
        loader.classList.remove('d-none');
    }
    let hideLoader=()=>{
        content.classList.add('d-block');
        content.classList.remove('d-none');
        loader.classList.add('d-none');
        loader.classList.remove('d-flex');
    }
    window.uploadProfile=async(input)=>{
        showLoader();
        const file = input.files[0]; 
        // console.log(file);
        const formData = new FormData(); 
        formData.append('profilepic', file);
        const response=await axios.post(api+'/api/upload-profilepic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        hideLoader();
        location.reload();
    }
    window.uploadResume=async(input)=>{
        showLoader();
        const file = input.files[0]; 
        // console.log(file);
        const formData = new FormData(); 
        formData.append('profilepic', file);
        const response=await axios.post(api+'/api/upload-resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        hideLoader();
        location.reload();
    }
    window.uploadProjectImage=async(input,id)=>{
        showLoader();
        const file = input.files[0]; 
        const formData = new FormData(); 
        formData.append('projectpic', file);
        const response=await axios.post(api+'/api/upload-projectpic/'+id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        hideLoader();
        location.reload();
    }
    window.updatePortfolioName=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:0,value:x.value});
        hideLoader();
    }
    window.updateHomepageHeading=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:1,value:x.value});
        hideLoader();
    }
    window.updateHomepageDescription=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:2,value:x.value});
        hideLoader();
    }
    window.updateAboutpageDescription=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:3,value:x.value});
        hideLoader();
        window.location='/admin/dashboard#about'
    }
    window.updateAbout=async (y,x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:4,value:x.value,number:y});
        hideLoader();
        window.location='/admin/dashboard#moreabout'
    }
    window.removeSkill=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:6,number:x});
        hideLoader();
        window.location.reload()
    }
    window.addSkill=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:5,value:x.value});
        hideLoader();
        window.location.reload()
    }
    window.updateFooterDescription=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:7,value:x.value});
        hideLoader();
        window.location='/admin/dashboard#footer'
    }
    window.updateFooterDeveloper=async (x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:8,value:x.value});
        hideLoader();
        window.location='/admin/dashboard#footer'
    }
    window.updateLinks=async (x,y)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:9,value:y.value,number:x});
        hideLoader();
        window.location='/admin/dashboard#footer'
    }
    window.addNewAboutParagraph=async()=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:10});
        hideLoader();
        window.location.reload()
    }
    window.addNewLink=async()=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:11});
        hideLoader();
        window.location.reload()
    }
    window.removeAboutParagraph=async(x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:12,number:x});
        hideLoader();
        window.location.reload()
    }
    window.removeLink=async(x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:13,number:x});
        hideLoader();
        window.location.reload()
    }
    window.updateProjectspageDescription=async(x)=>{
        showLoader();
        const response=await axios.put(api+"/api/profile",{index:14,value:x.value});
        hideLoader();
        window.location='/admin/dashboard#projects'
    }
    window.updateProjectName=async(id,x)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:0,value:x.value,id:id});
        // console.log(id,x.value);
        hideLoader();
        window.location='/admin/dashboard#projects'
    }
    window.updateProjectDescription=async(id,x)=>{
        showLoader();
        // console.log(id,x.value);
        const response=await axios.put(api+"/api/project/"+id,{index:1,value:x.value,id:id});
        hideLoader();
        window.location='/admin/dashboard#projects'
    }
    window.changProjectVisiblity=async(id,x)=>{
        showLoader();
        // console.log(id,x.value);
        const response=await axios.put(api+"/api/project/"+id,{index:2,value:x.value,id:id});
        hideLoader();
        window.location='/admin/dashboard#projects'
    }
    window.deleteProject=async (id)=>{
        showLoader();
        const reply=confirm("Are You Sure You Whant To Delete Project?");
        
        if(reply){
            const response=await axios.delete(api+"/api/project/"+id);
        }
        hideLoader();
        location.reload();
    }
})