window.addEventListener('load',(event)=>{
    const cross=document.getElementById('bars');
    const times=document.getElementById('times');
    const smallnav=document.getElementById('smallnav');
    window.showNav=()=>{
        cross.style.display="none";
        times.style.display="block";
        smallnav.style.opacity=1;
    }
    window.closeNav=()=>{
        cross.style.display="block";
        times.style.display="none";
        smallnav.style.opacity=0;
    }
    console.log(cross);
})