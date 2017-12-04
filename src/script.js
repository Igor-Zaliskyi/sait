// window.scrollTo(x,y)
let scrolled;
let timer;
document.querySelector('body .button_up').onclick = () => { 
    scrolled = window.pageYOffset;
    scrollToTop(); 
}
function scrollToTop(){
    if (scrolled > 0){
        window.scrollTo(0, scrolled);
        scrolled = scrolled - 100; 
        timer = setTimeout(scrollToTop, 20);
    }
    else{
        clearTimeout(timer);
        window.scrollTo(0,0);
    }
}


