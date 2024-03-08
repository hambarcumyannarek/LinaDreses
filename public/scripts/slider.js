"use strict";

const imagesCont = document.querySelectorAll('.bigImg');

const leftRightBtn = document.querySelectorAll('.LFbtn');

imagesCont.forEach((imgCont) => {
    imgCont.querySelectorAll('img').forEach((img) => {
        img.addEventListener('mousedown', function(evn) {
            evn.preventDefault()
        })})
})


leftRightBtn.forEach((btn) => {
    btn.addEventListener('click', function(elm) {
        clcikBtn(elm.target);
        drowCircule(elm.target);
        ditablishLR(elm.target);
    })
})

function recursia(elm) {
    if(elm.className.search('sliderContainer') !== -1) {
        return elm;
    }
    return recursia(elm.parentElement)
}

function clcikBtn(elm) {
    const thisCont = recursia(elm);
    let thisIndex = +recursia(elm).getAttribute('data-value');
    
    if(elm.className.search('left') !== -1) {
        thisIndex--;
        thisCont.setAttribute('data-value', thisIndex);
    } else {
        thisIndex++;
        thisCont.setAttribute('data-value', thisIndex);
    }
    
    thisCont.querySelector('.bigImg').style.transform = `translateX(${-thisIndex * 100}%)`
}


let sliderContAll = document.querySelectorAll('.sliderContainer');


function update() {
    sliderContAll.forEach(cont => {
        const smallImages = cont.querySelectorAll('.smallImages img');
    
        smallImages.forEach((val, i) => {
            const thisCont = recursia(val);
            val.addEventListener('click', function(evn) {
                thisCont.setAttribute('data-value', i);
                let imgIndex = +thisCont.getAttribute('data-value');
                thisCont.querySelector('.bigImg').style.transform = `translateX(${-imgIndex * 100}%)`;
         
                drowCircule(thisCont);
                ditablishLR(thisCont);
            })
        })
    })
}

update();
function drowCircule(elm) {    
    const thisCont = recursia(elm);
    const thisCircule = thisCont.querySelectorAll('.smallImages img')
    let thisIndex = +recursia(elm).getAttribute('data-value');
    thisCircule.forEach(img => img.classList.remove('active'))
    thisCircule[thisIndex].classList.add('active');
    for(let i = 0; i < thisCircule.length; i++) {
        thisIndex !== i ? thisCircule[i].classList.remove('active') : thisCircule[i].classList.add('active');
    }
    update();
}

function ditablishLR(getCont) {
    const cont = recursia(getCont);
    const thisContIndex = +cont.getAttribute('data-value');
    const leftRightBtn = cont.querySelectorAll('.LFbtn');

    if(cont.querySelector('.left').getAttribute('disabled', '') !== null || cont.querySelector('.right').getAttribute('disabled', '') !== null) {
        leftRightBtn.forEach((btnn) => {
            btnn.removeAttribute('disabled');
        });
    }    
    if(thisContIndex === 0) {
        cont.querySelector('.left').setAttribute('disabled', '');
    } else if(thisContIndex === cont.querySelectorAll('.bigImg img').length-1) {
        cont.querySelector('.right').setAttribute('disabled', '');
    }
}



let trueScroll;
let myFunc = undefined;
sliderContAll.forEach(cont => {
    cont.addEventListener('mousedown', function(evn) {
        cont.querySelector('.bigImg').style.cursor = 'grabbing';
        let scrollNum = evn.clientX;
        let lastNum = scrollNum;
        let lastX = scrollNum;
        let fr = 1;
        const imagesCont = cont.querySelector('.bigImg');
        myFunc = function(evn) {
            if((imgIndex !== 0 || fr > 1) && evn.clientX > lastNum) {
                fr += lastX-evn.clientX;
                imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-fr)}px))`;   
            } else if((imgIndex !== cont.querySelectorAll('.bigImg img').length-1 || fr < 0) && evn.clientX < lastNum) {
                fr += lastX-evn.clientX;
                imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${-fr}px))`; 
            }
        
            lastX = evn.clientX;
        
            if(fr > imagesCont.offsetWidth/2+imagesCont.offsetWidth || fr < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth)) {
                cont.parentElement.removeEventListener('mousemove', myFunc)
            }
        
            if(fr > imagesCont.offsetWidth/5) {
                trueScroll = 'goRight';
            } else if(fr < -imagesCont.offsetWidth/5){
                trueScroll = 'goLeft';
            } else {
                trueScroll = 'stop';
            }
        };
        let imgIndex = +recursia(cont).getAttribute('data-value');
        function GetParentName(elm) {
            if(elm.className.search('sliderrrr') !== -1) {
                return elm;
            }
            return GetParentName(elm.parentElement)
        }
        GetParentName(cont).addEventListener('mousemove', myFunc) // this is a .slider 

    })

})


document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('mouseup', function(evn) {    
        slider.querySelector('.bigImg').style.cursor = 'grab';
        let cont = slider.querySelector('.sliderContainer');
        let thisIndex = cont.getAttribute('data-value');
        slider.removeEventListener('mousemove', myFunc);

        if(trueScroll === 'goRight') {
            trueScroll = "stop"
            thisIndex++;
            cont.setAttribute('data-value', thisIndex);
            drowCircule(cont);
            ditablishLR(cont);
        } else if(trueScroll === 'goLeft') {
            trueScroll = "stop"
            thisIndex--;
            cont.setAttribute('data-value', thisIndex);
            drowCircule(cont);
            ditablishLR(cont);
        } else {
            thisIndex = thisIndex;
        }
        
        cont.querySelector('.bigImg').style.transform = `translateX(${-thisIndex * 100}%)`;
        
    })
    
})
