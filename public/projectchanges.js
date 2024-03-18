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
    window.updateProjectspageDescription=async (x,id)=>{
        showLoader();
        // console.log(id,x.value);
        const response=await axios.put(api+"/api/project/"+id,{index:3,value:x.value,id:id});
        hideLoader();
        window.location=`/admin/dashboard/projectdetails/${id}#home`
    }
    window.updateSourceLink=async (x,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:4,value:x.value,id:id});
        hideLoader();
        window.location=`/admin/dashboard/projectdetails/${id}#home`
    }
    window.updateProjectspageOverview=async (x,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:5,value:x.value,id:id});
        hideLoader();
        window.location=`/admin/dashboard/projectdetails/${id}#overview`
    }
    window.updateAbout=async (number,x,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:6,value:x.value,id:id,number:number});
        hideLoader();
        window.location=`/admin/dashboard/projectdetails/${id}#overview`
    }
    window.removeFeaturesParagraph=async (number,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:7,id:id,number:number});
        hideLoader();
        window.location.reload();
    }
    window.addNewFeaturesParagraph=async (id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:8,id:id});
        hideLoader();
        window.location.reload();
    }
    window.removeSkill=async (number,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:9,id:id,number:number});
        hideLoader();
        window.location.reload();
    }
    window.addSkill=async (x,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:10,value:x.value,id:id});
        hideLoader();
        window.location.reload();
    }
    window.updateLiveLink=async (x,id)=>{
        showLoader();
        const response=await axios.put(api+"/api/project/"+id,{index:11,value:x.value,id:id});
        hideLoader();
        window.location=`/admin/dashboard/projectdetails/${id}#overview`
    }

})