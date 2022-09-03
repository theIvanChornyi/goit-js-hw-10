import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {countrySearch} from './scripts/fetchCountries';
const debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES_QUANTITY = 10;
const MIN_COUNTRIES_QUANTITY = 1;

const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(getData, DEBOUNCE_DELAY));

function getData(event) {
    let userResponse = event.target.value.trim();
    if (userResponse === '') {
        destroyHtml(countriesListEl);
        destroyHtml(countryEl);
        return;
    }
    countrySearch.toFind = userResponse;

    countrySearch.fetchCountries().
        then(countries => {
            if (countries.length > MAX_COUNTRIES_QUANTITY) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                return countries;
            }
            if (countries.length < MAX_COUNTRIES_QUANTITY && countries.length > MIN_COUNTRIES_QUANTITY) {
                destroyHtml(countryEl);
                ParseShortCountriesList(countries);
                return countries;
            }

                destroyHtml(countriesListEl);
                ParseCountryEl(countries);
                return countries;
                
        }).catch(
            error => {
                Notify.failure('Oops, there is no country with that name');
                console.log('error', error);
                destroyHtml(countryEl);
                destroyHtml(countriesListEl);
            }
        );
}

function ParseCountryEl(Obj) {
    const countryInfoMarkup = Obj.map(({ name, capital, population, flags, languages }) => 
   `<article class='country'>
        <h2 class ='country__name'>${name.official}</h2>
        <img class = 'country__image' src="${flags.svg}" alt="${name.official} flag" width = '40px'>
        <ul class ='country__list'>
            <li class ='country__item'><span class ='country__subtitle'>Capital:</span> ${capital}</li>
            <li class ='country__item'><span class ='country__subtitle'>Population:</span> ${population}</li>
            <li class ='country__item'><span class ='country__subtitle'>Languages:</span>
            ${Object.values(languages).join(', ')}</li>
        </ul>
    </article>`
    );
    countryEl.innerHTML = countryInfoMarkup.join('');
}

function ParseShortCountriesList(array) {
    const shortListHtmlMarkup = array.map(({ flags, name }) =>
    `<li class = 'country-list__item'>
        <img class = 'country-list__image' src="${flags.svg}" alt="${name.official} flag" width ='20px'>
        <span class = 'country-list__name'>${name.official}</span>
    </li>`);

    countriesListEl.innerHTML = shortListHtmlMarkup.join('');
}

function destroyHtml(htmlFatherEl) {
    htmlFatherEl.innerHTML = '';
}