// window.scrollTo(x,y)
let scrolled
let timer
const buttonUp = document.querySelector('body .button_up').onclick = () => {
    scrolled = window.pageYOffset
    scrollToTop()
}

function scrollToTop() {
    if (scrolled > 0) {
        window.scrollTo(0, scrolled)
        scrolled = scrolled - 100
        timer = setTimeout(scrollToTop, 20)
    }
    // if(scrolled < 400){
    //     buttonUp.style.opacity = "0";
    // }
    else {
        clearTimeout(timer)
        window.scrollTo(0, 0)
    }
}

// const y = document.querySelector('body .button_up').style.opacity = "0";

// function top(){

//         if (window.pageYOffset > 400){
//         t.style.opacity = "0";
//         }else{
//             y.style.opacity = "1";
//         }
//     }
