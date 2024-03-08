const newYear = new Date('1 Jan 2025');
const date = new Date();
const secondNewYear = (newYear - date) / 1000;

let dayT = Math.round(secondNewYear / 3600 / 24), hourT = Math.round(secondNewYear / 3600) % 24,minuteT = Math.round(secondNewYear / 60) % 60, secondT = Math.floor(secondNewYear % 60);

const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
day.innerText = dayT;
hour.innerText = hourT;
minute.innerText = minuteT;
second.innerText = secondT;
const id = setInterval(() => {
    secondT--;
    second.innerText = secondT;

    if(secondT <= 0) {
        secondT = 59;
        minuteT--;
        minute.innerText = minuteT;

        if(minuteT <= 0) {
            minuteT = 59;
            minute.innerText = minuteT;
            hourT--;
            hour.innerText = hourT;
            if(hourT <= 0) {
                hourT = 24;
                hour.innerText = hourT;
                dayT--;
                day.innerText = dayT;
                if(dayT <= 0) {
                    clearInterval(id);
                    console.log('finishe')
                }
            }
        }
    }
}, 1000)
