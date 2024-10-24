import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let selectedDate = null;
let timeToCount = 0;
const dateElement = document.getElementById('datetime-picker');
const actionButton = document.querySelector('button[data-start]');
const daysComponent = document.querySelector('.value[data-days]');
const hoursComponent = document.querySelector('.value[data-hours]');
const minutesComponent = document.querySelector('.value[data-minutes]');
const secondsComponent = document.querySelector('.value[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    checkTheDate();
  },
};
flatpickr(dateElement, options);
actionButton.disabled = true;

const checkTheDate = () => {
  const result = calculateTime();
  if (result <= 0) {
    actionButton.disabled = true;
    iziToast.warning({
      timeout: 5000,
      position: 'center',
      message: 'Please select a date in the future!',
    });
  } else {
    timeToCount = result;
    actionButton.disabled = false;
  }
};

const calculateTime = () => {
  return selectedDate - new Date();
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

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

actionButton.addEventListener('click', () => {
  const timer = setInterval(() => {
    actionButton.disabled = true;
    const time = calculateTime();
    if (time <= 0) {
      clearTimeout(timer);
      actionButton.disabled = false;
      iziToast.success({
        timeout: 5000,
        position: 'center',
        message: 'Countdown complete!!',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(time);
      daysComponent.textContent = addLeadingZero(days);
      hoursComponent.textContent = addLeadingZero(hours);
      minutesComponent.textContent = addLeadingZero(minutes);
      secondsComponent.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});
