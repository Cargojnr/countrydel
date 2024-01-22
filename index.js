// document.addEventListener('DOMContentLoaded', function() {
//   const searchButton = document.querySelector('button');
//   const searchInput = document.getElementById('searchInput');

//   searchButton.addEventListener('click', searchCountry);
//   searchInput.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//       searchCountry();
//       searchButton.classList.add('clicked');
//     } else if(searchInput.value != '') {
//       searchButton.classList.remove('clicked');
//     } 
//   });
// });

// function searchCountry() {
//   const searchInputValue = document.getElementById('searchInput').value.trim();

//   if (!searchInputValue) {
//     displayErrorMessage('Please enter a country name');
//     return;
//   }


  
//   fetch(`https://restcountries.com/v3.1/name/${searchInputValue}`)
//     .then(response => {
//       if (!response.ok) { 
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.status === 404) {
//         throw new Error('Country not found');
//       } else {
//         displayCountryDetails(data[0]);
//       }
//     })
//     .catch(error => {
//       displayErrorMessage(error.message);
//     });

//     searchInput.value = '';
// }

// function displayCountryDetails(country) {
//   let countryDetailsDiv = document.getElementById('country-details');
//   const currency = Object.values(country.currencies)[0].name;
//   countryDetailsDiv.innerHTML = `
//     <h2>${country.name.common}</h2>
//     <p>Capital: ${country.capital}</p>
//     <p>Population: ${country.population}</p>
//     <p class="country__row"> Currency: ${currency}</p>
//     <p>Language(s): ${Object.values(country.languages).join(', ')}</p>
//     <img src="${country.flags.png}" alt="${country.name.common} flag">

//   `;
// }

// function displayErrorMessage(message) {
//   let countryDetailsDiv = document.getElementById('country-details');
//   countryDetailsDiv.innerHTML = `<p>${message}</p>`;
// }

const perPage = 9; // number of countries per page
let currentPage = 1; // current page number
let countriesData = []; // array to store all countries data
let URL = 'https://restcountries.com/v3.1/all'; // API URL

// Fetch data from API and store in array
fetch(URL)
  .then(response => response.json())
  .then(data => {
    countriesData = data;
    renderCountries(currentPage);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Render countries for given page number
function renderCountries(pageNumber) {
  const startIndex = (pageNumber - 1) * perPage;
  const endIndex = startIndex + perPage;
  const filteredCountries = filterCountries(countriesData);
  const pageData = filteredCountries.slice(startIndex, endIndex);
  const countriesDiv = document.getElementById('countries');
  countriesDiv.innerHTML = ''; // clear previous data
  const countriesList = document.createElement('ul');
  pageData.forEach(country => {
    const countryItem = document.createElement('li');
    const countryName = document.createElement('h2');
    const countryCapital = document.createElement('p');
    const countryFlag = document.createElement('img');
      const currency = Object.values(country.currencies)[0].name;
        
    countryName.textContent = country.name.common;
    countryCapital.innerHTML = `
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b class="country__row"> Currency:</b> ${currency}</p>
    <p><b>Language(s):</b> ${Object.values(country.languages).join(', ')}</p>
  `;
    countryFlag.src = country.flags.png;
    countryItem.appendChild(countryName);
    countryItem.appendChild(countryCapital);
    countryItem.appendChild(countryFlag);
    countriesList.appendChild(countryItem);
  });
  countriesDiv.appendChild(countriesList);
  renderPagination();
}

// Render pagination buttons
function renderPagination() {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = ''; // clear previous buttons
  
  const filteredCountries = filterCountries(countriesData);
  const numPages = Math.ceil(filteredCountries.length / perPage);

  // Add "Go to first page" button
  const firstPageButton = document.createElement('button');
  firstPageButton.textContent = '<<';
  firstPageButton.addEventListener('click', () => {
    currentPage = 1;
    renderCountries(currentPage);
    window.scrollTo(0, 0);
  });
  paginationDiv.appendChild(firstPageButton);
  
  if (numPages <= 1) {
    // Hide pagination if there's only one page
    paginationDiv.style.display = 'none';
    return;
  } else {
    paginationDiv.style.display = 'block';
  }
  
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, numPages);
  
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPage) {
      button.disabled = true; // disable current page button
    } else {
      button.addEventListener('click', () => {
        currentPage = i;
        renderCountries(currentPage);
        window.scrollTo(0, 0);
      });
    }
    paginationDiv.appendChild(button);
  }

  // Add "Go to last page" button
  const lastPageButton = document.createElement('button');
  lastPageButton.textContent = '>>';
  lastPageButton.addEventListener('click', () => {
    currentPage = numPages;
    renderCountries(currentPage);
    window.scrollTo(0, 0);
  });
  paginationDiv.appendChild(lastPageButton);
}

// Filter countries based on search input
function filterCountries(countries) {
  const searchInput = document.getElementById('search').value.toLowerCase();
  return countries.filter(country => country.name.common.toLowerCase().includes(searchInput));
}

// Re-render countries and pagination when search input changes
document.getElementById('search').addEventListener('input', () => {
  currentPage = 1;
  renderCountries(currentPage);
});


const adCancelButtons = document.querySelector('.ad-cancel');

    adCancelButtons.addEventListener('click', function () {
            const adContainer = this.closest('.ads');
            adContainer.style.display = 'none';
        });

        
// function displayRandomAds(){
//     let ads = document.querySelector('blockquote');

//     var randomAd = [
//      'r',
//      'd',
//      'f',
//      'g',
//      'h'
//     ];
//     let randomAdIndex = randomAd[Math.floor(Math.random() * randomAd.length)];

//     ads.innerHTML = randomAdIndex;

//  };
//  displayRandomAds();
//  setInterval(displayRandomAds, 1000);