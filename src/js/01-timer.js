import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedDate = null;
const dateElement = document.getElementById('datetime-picker');
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

const checkTheDate = () => {
  const date = new Date();
  const result = selectedDate - date;
  const button = document.querySelector('button[data-start');
  if (result <= 0) {
    button.disabled = true;
    alert('Please select a date in the future.');
  } else {
    button.disabled = false;
  }
};
