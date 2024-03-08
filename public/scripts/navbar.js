
// <=============== NAVBAR START ===============>

const navbar = document.querySelector('#header');
const topBtn = document.querySelector('.topBtn');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('active', window.scrollY > 0);
    topBtn.classList.toggle('active', window.scrollY > 800);
})


const linkBg = document.querySelector('#header .linkBg');
linkBg.addEventListener('mouseenter', () => {
    linkBg.classList.add('active');
})

linkBg.addEventListener('mouseleave', () => {
    linkBg.classList.remove('active');
})


const responsiveMenu = document.querySelector('.responsiveMenu');
const resplinkBg = responsiveMenu.querySelector('.linkBg');
resplinkBg.addEventListener('click', () => {
    resplinkBg.classList.toggle('active');
})

const menuBtn = navbar.querySelector('.menuBtn');
menuBtn.addEventListener('click', () => {
    responsiveMenu.classList.add('active');
    document.body.style.overflowY = 'hidden';
})

function recursi(tag) {
    let parentTag = tag.parentElement;
    if(tag.className.search('aside') !== -1) {
        return false;
    } else if(tag.className.search('responsiveMenu') !== -1) {
        return true;
    }
    return recursi(parentTag);
}


function removeResponsiveMenu() {
    responsiveMenu.classList.remove('active');
    document.body.style.overflowY = 'auto';
}

responsiveMenu.addEventListener('click', (evn) => {
    if(recursi(evn.target)) {
        removeResponsiveMenu();
    }
})
const closeRespMenuBtn = responsiveMenu.querySelector('.close');
closeRespMenuBtn.addEventListener('click', removeResponsiveMenu);

// <=============== NAVBAR FINISHED ===============>

