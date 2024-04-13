window.addEventListener('load',async(event)=>{
    const api=location.protocol+"//"+ location.hostname+":"+location.port;
    let checkLoginStatus=async ()=>{
        const response=await axios.get(api+"/api/adminloginstatus");
        if(response.data.status!==200){
            window.location=api+"/admin/"
        }
    }
    checkLoginStatus();
    const loader=document.getElementById('loader');
    const content=document.getElementById('content');
    const cross=document.getElementById('bars');
    const times=document.getElementById('times');
    const smallnav=document.getElementById('smallnav');
    const customnavbar=document.getElementById('customnavbar');
    // const nightmode=document.getElementById('nightmode');
    const root = document.documentElement;
    const home=document.getElementById('home');
    const form=document.getElementById("form");
    const project_form=document.getElementById("project_form");
    let moderes = await axios.get(api + '/api/modestatus')
    let flag = !Boolean(Number(moderes.data.value))
    if (flag) {
      //nignt
      root.style.setProperty('--bs-primary-rgb', '16,24,39')
      root.style.setProperty('--bs-tertiary-rgb', '30,41,60')
      root.style.setProperty('--bs-black-rgb', '255, 211, 149')
      root.style.setProperty('--bs-white-rgb', '156, 163, 175')
      home.style.background = 'RGBA(16,24,39)'
    } else {
      //day
      root.style.setProperty('--bs-primary-rgb', '255,255,255')
      root.style.setProperty('--bs-tertiary-rgb', '250, 250, 250')
      root.style.setProperty('--bs-black-rgb', '0, 0, 0')
      root.style.setProperty('--bs-white-rgb', '102, 102, 102')
      home.style.background = "url('../assets/background.webp')"
    }
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
    project_form.addEventListener('submit',async (e)=>{
        e.preventDefault();
        showLoader();
        const formData = new FormData(project_form);
        console.log(formData);
        try {
            const response = await axios.post(api+'/api/project', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            hideLoader();
            location.reload();
          } catch (error) {
            
            hideLoader();
            console.error('Error:', error);
          }
    })
    window.showForm=(x)=>{
        if(form.classList.contains('d-none')){
            form.classList.remove('d-none');
            form.classList.add('d-flex');
            document.getElementById('button').innerText="Close Form"
        }else{
            form.classList.remove('d-flex');
            form.classList.add('d-none');
            document.getElementById('button').innerText="Add New Project"
        }
    }
    
    function showContent() {
        loader.classList.remove('d-flex');
        loader.classList.add('d-none');
        content.classList.remove('d-none');
        content.classList.add('d-block');
    }

    function imagesLoaded() {
        const images = document.getElementsByTagName('img');
        let loadedCount = 0;
        for (let i = 0; i < images.length; i++) {
            if (images[i].complete) {
                loadedCount++;
            }
        }
        return loadedCount === images.length;
    }

    if (imagesLoaded()) {
        showContent();
    } else {
        window.addEventListener('load', showContent);
    }
    window.showNav=()=>{
        cross.style.display="none";
        times.style.display="block";
        smallnav.classList.remove('d-none');
        smallnav.classList.add('d-flex');
        customnavbar.style.boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0)";
        setTimeout(()=>{
            smallnav.style.opacity=1;
        },0);
    }
    window.closeNav=()=>{
        cross.style.display="block";
        times.style.display="none";
        smallnav.style.opacity=0;
        customnavbar.style.boxShadow="0px 4px 6px 0px rgba(0, 0, 0, 0.2)";
        setTimeout(()=>{
            smallnav.classList.remove('d-flex');
            smallnav.classList.add('d-none');
        },300);
    }
    window.changeMode = async () => {
        if (!flag) {
          root.style.setProperty('--bs-primary-rgb', '16,24,39')
          root.style.setProperty('--bs-tertiary-rgb', '30,41,60')
          root.style.setProperty('--bs-black-rgb', '255, 211, 149')
          root.style.setProperty('--bs-white-rgb', '156, 163, 175')
          home.style.background = 'RGBA(16,24,39)'
          await axios.get(api + '/api/updatemode/0')
          flag = true
        } else {
          root.style.setProperty('--bs-primary-rgb', '255,255,255')
          root.style.setProperty('--bs-tertiary-rgb', '250, 250, 250')
          root.style.setProperty('--bs-black-rgb', '0, 0, 0')
          root.style.setProperty('--bs-white-rgb', '102, 102, 102')
          home.style.background = "url('../assets/background.webp')"
          await axios.get(api + '/api/updatemode/1')
          flag = false
        }
      }
})