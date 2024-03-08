const inputs = document.querySelectorAll('.inputs input');
const button = document.querySelector('.button');
function isActive(index, code, value) {
    console.log(index)
    if(code === 'Backspace') {
        button.classList.remove('active');

        if(index === 0) {
            inputs[0].removeAttribute('disabled', '');
            inputs[0].focus();
            return;
        } 
        inputs[index].setAttribute('disabled', '');
        inputs[index-1].removeAttribute('disabled');
        inputs[index-1].focus();
    } else if(index+1 < inputs.length) {
        inputs[index].setAttribute('disabled', '');
        inputs[index+1].removeAttribute('disabled');
        inputs[index+1].focus();
    }
}

inputs.forEach((input, index) => {
    input.addEventListener('keyup', async (evn) => {
        if(index === inputs.length-1) {
            button.classList.add('active');
        }
        
       await isActive(index, evn.code, evn.target.value);
    })
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    inputs.forEach(input => input.removeAttribute('disabled'))
    e.target.submit();
})
inputs[0].focus();