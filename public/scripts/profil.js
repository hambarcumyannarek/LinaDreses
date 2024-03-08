
const profilBtn = document.querySelector('.profilBtn');
const profil = document.querySelector('.profil');

profilBtn.addEventListener('click', () => {
    profil.classList.add('active');
})

profil.querySelector('.close').addEventListener('click', () => {
    profil.classList.remove('active');
})