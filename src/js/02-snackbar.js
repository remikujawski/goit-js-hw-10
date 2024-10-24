import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const actionButton = document.querySelector('button[type="submit"]');
const fulfilledOption = document.querySelector('input[value="fulfilled"]');
const rejectedOption = document.querySelector('input[value="rejected"]');
const timePicker = document.querySelector('input[type="number"]');
let isSuccess = false;
let checked = false;
let time = 0;

fulfilledOption.addEventListener('change', e => {
  isSuccess = true;
  checked = true;
});
rejectedOption.addEventListener('change', e => {
  isSuccess = false;
  checked = true;
});
timePicker.addEventListener('input', e => {
  time = parseInt(e.target.value);
});

actionButton.addEventListener('click', evt => {
  evt.preventDefault();
  if (typeof time === 'number' && time > 0) {
    if (checked) {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isSuccess) {
            resolve('Value passed to resolve function');
          } else {
            reject('Error passed to reject function');
          }
        }, time);
      });

      promise
        .then(value => {
          iziToast.success({
            title: 'Promise fulfilled:',
            position: 'center',
            message: value,
          });
        })
        .catch(error => {
          iziToast.error({
            title: 'Promise rejected:',
            position: 'center',
            message: error,
          });
        });
    } else {
      iziToast.warning({
        title: 'Missing data:',
        position: 'center',
        message: 'Sorry, but you have to choose a promise!',
      });
    }
  } else {
    if (checked) {
      iziToast.warning({
        title: 'Missing data:',
        position: 'center',
        message: 'Sorry, but you have to specify the time!',
      });
    } else {
      iziToast.warning({
        title: 'Missing data:',
        position: 'center',
        message:
          'Sorry, but you have to specify the time and choose a promise!',
      });
    }
  }
});
