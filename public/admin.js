window.addEventListener('load',(event)=>{
    const api=location.protocol+"//"+ location.hostname+":"+location.port;
    let checkLoginStatus=async ()=>{
        const response=await axios.get(api+"/api/adminloginstatus");
        if(response.data.status===200){
            window.location=api+"/admin/dashboard"
        }
    }
    checkLoginStatus();
    const loader=document.getElementById('loader');
    const loader2=document.getElementById('loader2');
    const content=document.getElementById('content');
    const loginform=document.getElementById('loginform');
    const cross=document.getElementById('bars');
    const times=document.getElementById('times');
    const smallnav=document.getElementById('smallnav');
    const customnavbar=document.getElementById('customnavbar');
    // const nightmode=document.getElementById('nightmode');
    const root = document.documentElement;
    const home=document.getElementById('home');
    const contact=document.getElementById('contact');
    const username=document.getElementById('username');
    const password=document.getElementById('password');
    let flag=true;
    loginform.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const response=await axios.post(api+'/api/validateadmin',{username:username.value, password:password.value});
        loginform.classList.remove("d-block");
        loginform.classList.add("d-none");
        loader2.classList.remove('d-none');
        loader2.classList.add('d-flex');
        if(response.data.status===200){
            username.value="";
            password.value="";
            setTimeout(()=>{
                loginform.classList.add("d-block");
                loginform.classList.remove("d-none");
                loader2.classList.remove('d-flex');
                loader2.classList.add('d-none');
                window.location=api+"/admin/dashboard"
            },1000)
        }else{
            loginform.classList.add("d-block");
            loginform.classList.remove("d-none");
            loader2.classList.remove('d-flex');
            loader2.classList.add('d-none');
            alert("Invalid Username or Password");
        }
    })
    
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
    window.changeMode=()=>{
        if(flag){
            root.style.setProperty('--bs-primary-rgb', '16,24,39');
            root.style.setProperty('--bs-tertiary-rgb', '30,41,60');
            root.style.setProperty('--bs-black-rgb', '255, 211, 149');
            root.style.setProperty('--bs-white-rgb', '156, 163, 175');
            home.style.background="RGBA(16,24,39)"
            flag=false;
        }else{
            root.style.setProperty('--bs-primary-rgb', '255,255,255');
            root.style.setProperty('--bs-tertiary-rgb', '250, 250, 250');
            root.style.setProperty('--bs-black-rgb', '0, 0, 0');
            root.style.setProperty('--bs-white-rgb', '102, 102, 102');
            home.style.background="url('../assets/background.webp')"
            flag=true;
        }
    }
})