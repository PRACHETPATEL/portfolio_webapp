window.addEventListener('load',(event)=>{
    const cross=document.getElementById('bars');
    const times=document.getElementById('times');
    const smallnav=document.getElementById('smallnav');
    const customnavbar=document.getElementById('customnavbar');
    // const nightmode=document.getElementById('nightmode');
    const root = document.documentElement;
    const home=document.getElementById('home');
    const contact=document.getElementById('contact');
    let flag=true;
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
            contact.style.background="RGBA(30,41,60)"
            // nightmode.style.color="white";
            flag=false;
        }else{
            root.style.setProperty('--bs-primary-rgb', '255,255,255');
            root.style.setProperty('--bs-tertiary-rgb', '250, 250, 250');
            root.style.setProperty('--bs-black-rgb', '0, 0, 0');
            root.style.setProperty('--bs-white-rgb', '102, 102, 102');
            home.style.background="url('assets/background.jpg')"
            contact.style.background="url('assets/background.jpg')"
            // nightmode.style.color="#101827";
            flag=true;
        }
    }
})