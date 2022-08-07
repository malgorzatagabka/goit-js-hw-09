import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDay;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();
    selectedDay = selectedDates[0].getTime();
    if (selectedDay <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(dateInput, options);
startBtn.addEventListener('click', startCountdown);
startBtn.setAttribute('disabled');

function startCountdown(event) {
  startBtn.setAttribute('disabled', true);
  startBtn.classList.add('timer--end');
  timerId = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = selectedDay - now;
    const timeLeftConverted = convertMs(timeLeft);
    if (timeLeftConverted.seconds < 0) {
      clearInterval(timerId);
      let field = document.querySelectorAll('.field');
      for (let i = 0; i < field.length; i++) {
        field[i].classList.add('timer--end');
      }
      return;
    }
    addTextContetnt(timeLeftConverted);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addTextContetnt({ days, hours, minutes, seconds }) {
  dataDaysEl.textContent = addLeadingZero(days);
  dataHoursEl.textContent = addLeadingZero(hours);
  dataMinutesEl.textContent = addLeadingZero(minutes);
  dataSecondsEl.textContent = addLeadingZero(seconds);
}
