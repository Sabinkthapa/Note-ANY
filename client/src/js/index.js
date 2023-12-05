import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load',() => {

    //create a new workbox instance with path

    const wb = new Workbox('service-worker.js');

    wb.register().then((registration)=> {
      console.log('service worker registered with scope',registration.scope);
    }) 
    .catch((error)=> {
      console.error('Service workers are not supported in this browser.',error);
    });
  });
}
