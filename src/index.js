import './sass/main.scss';
import '../node_modules/lodash.debounce';
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css'
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import findCountry from './js/fetchCountries.js';
import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';

defaultModules.set(PNotifyMobile, {});
const userInput = document.querySelector('.input');
const showResult = document.querySelector('.result');
const _ = require('lodash');


userInput.addEventListener('input', _.debounce(searchForCountry, 1500));

function searchForCountry(e) {
  const searchInput = e.target.value;
  clearHtml();
  //console.log(searchInput);

  findCountry.fetchCountries(searchInput).then(data => {
    // console.log(data);
    // console.log(data.message);
    if(data.length > 10) {
      alert({
        text: 'Too many matches try inputing more characters'
      });
    } else if(data.length > 1){
      const templateList = createCountriesTemplate(data);
      insertResult(templateList); 
    } else if(data.message === "Not Found") {
      window.alert("There is no such country try again please");
    } else {
      const templateItem = createCountryTemplate(data);
      insertResult(templateItem);
    }
    
  });
}

function insertResult(item) {
  showResult.insertAdjacentHTML('beforeend', item);
}

function createCountryTemplate(item) {
  return countryTemplate(item);
}

function createCountriesTemplate(item) {
  return countriesTemplate(item);
}

function clearHtml() {
  showResult.innerHTML = '';
}
