// import { fetchAllListings } from '../lander/fetchposts.mjs';

// let listings = [];
// let currentListingIndex = 0;

// async function displayUserListings() {
//   console.log('displayUserListings called');

//   listings = await fetchAllListings();
//   console.log('Fetched listings:', listings);

//   const listingsDiv = document.getElementById('my-listings-container');
//   listingsDiv.innerHTML = '';

//   const containerDiv = document.createElement('div');
//   containerDiv.className = 'container';

//   const rowDiv = document.createElement('div');
//   rowDiv.className = 'row';
//   containerDiv.appendChild(rowDiv);
//   listingsDiv.appendChild(containerDiv);

//   displayListings(rowDiv, 50);

//   const loadMoreButton = document.createElement('button');
//   loadMoreButton.textContent = 'Load More';
//   loadMoreButton.addEventListener('click', () => displayListings(rowDiv, 50));
//   listingsDiv.appendChild(loadMoreButton);
// }

// function displayListings(rowDiv, count) {
//   for (let i = 0; i < count && currentListingIndex < listings.length && currentListingIndex < 400; i++, currentListingIndex++) {
//     const listing = listings[currentListingIndex];
//     console.log('Creating HTML for listing:', listing);

//     const listingElement = document.createElement('div');
//     listingElement.className = 'col-sm-4';

//     const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     imgElement.alt = '';
//     imgElement.className = 'img-thumbnail';
//     listingElement.appendChild(imgElement);

//     const titleElement = document.createElement('h2');
//     titleElement.textContent = listing.title;
//     listingElement.appendChild(titleElement);

//     const highestBidElement = document.createElement('p');
//     highestBidElement.textContent = `Highest bid: ${listing.highestBid} g`;
//     listingElement.appendChild(highestBidElement);

//     rowDiv.appendChild(listingElement);
//   }
// }

// window.addEventListener('DOMContentLoaded', displayUserListings);


import { fetchAllListings } from '../lander/fetchposts.mjs';

let listings = [];
let currentListingIndex = 0;

async function displayUserListings() {
  console.log('displayUserListings called');

  listings = await fetchAllListings();
  console.log('Fetched listings:', listings);

  const listingsDiv = document.getElementById('my-listings-container');
  listingsDiv.innerHTML = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';

  displayListings(containerDiv, 50);

  // Append the containerDiv to the listingsDiv
  listingsDiv.appendChild(containerDiv);

  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load More';
  loadMoreButton.addEventListener('click', () => displayListings(containerDiv, 50));
  listingsDiv.appendChild(loadMoreButton);
}

function displayListings(containerDiv, count) {
  let row = document.createElement('div');
  row.className = 'row mb-3 justify-content-center';
  containerDiv.appendChild(row);

  for (let i = 0; i < count && currentListingIndex < listings.length && currentListingIndex < 400; i++, currentListingIndex++) {
      const listing = listings[currentListingIndex];
      console.log('Creating HTML for listing:', listing);

      if (i % 4 === 0 && i !== 0) {
          row = document.createElement('div');
          row.className = 'row mb-3 justify-content-center';
          containerDiv.appendChild(row);
      }

      const listingElement = document.createElement('div');
      listingElement.className = 'col-12 col-sm-6 col-lg-3 mb-3 mt-3 listing position-relative';
      listingElement.setAttribute('data-id', listing.id);

      const cardElement = document.createElement('div');
      cardElement.className = 'card listing-card bg-dark text-black rounded border border-dark shadow';

      const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

      cardElement.innerHTML = `
          <img src="${imageUrl}" class="card-img" alt="${listing.title}" style="height: 100%; object-fit: cover;">
          <div class="card-img-overlay d-flex align-items-start justify-content-center">
              <h2 class="card-title">${listing.title}</h2>
          </div>
      `;

      listingElement.appendChild(cardElement);
      row.appendChild(listingElement);
  }
}

window.addEventListener('DOMContentLoaded', displayUserListings);