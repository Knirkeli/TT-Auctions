// import { getUserListings } from '../profile/profile.mjs';

// async function displayUserListings() {
//     console.log('displayUserListings called'); // Log when the function is called

//     const listings = await getUserListings();
//     console.log('Fetched listings:', listings); // Log the fetched listings

//     // Get the listings div
//     const listingsDiv = document.getElementById('my-listings-container');

//     // Clear the div
//     listingsDiv.innerHTML = '';

//     // Create a container div
//     const containerDiv = document.createElement('div');
//     containerDiv.className = 'container';

//     // Create a row div
//     const rowDiv = document.createElement('div');
//     rowDiv.className = 'row';

//     // Append the row div to the container div
//     containerDiv.appendChild(rowDiv);

//     // Append the container div to the listings div
//     listingsDiv.appendChild(containerDiv);

//     // Create HTML for each listing and append it to the row div
//     listings.slice(0, 3).forEach((listing, index) => {
//         console.log('Creating HTML for listing:', listing); // Log the listing being processed

//         const listingElement = document.createElement('div');
//         listingElement.className = 'col-sm-4';

//         // Use the first media item if it exists, otherwise use a default image
//         const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

//         const imgElement = document.createElement('img');
//         imgElement.src = imageUrl;
//         imgElement.alt = '';
//         imgElement.className = 'img-thumbnail';
//         listingElement.appendChild(imgElement);

//         const pElement = document.createElement('p');
//         pElement.textContent = `${listing.bidAmount} g`;
//         listingElement.appendChild(pElement);

//         rowDiv.appendChild(listingElement);
//     });
// }

// // Call displayUserListings when the window loads
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

  const rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  containerDiv.appendChild(rowDiv);
  listingsDiv.appendChild(containerDiv);

  displayListings(rowDiv, 50);

  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load More';
  loadMoreButton.addEventListener('click', () => displayListings(rowDiv, 50));
  listingsDiv.appendChild(loadMoreButton);
}

function displayListings(rowDiv, count) {
    for (let i = 0; i < count && currentListingIndex < listings.length && currentListingIndex < 400; i++, currentListingIndex++) {
      const listing = listings[currentListingIndex];
      console.log('Creating HTML for listing:', listing);
  
      const listingElement = document.createElement('div');
      listingElement.className = 'col-sm-4';
  
      const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';
  
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = '';
      imgElement.className = 'img-thumbnail';
      listingElement.appendChild(imgElement);
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = listing.title;
      listingElement.appendChild(titleElement);
  
      const highestBidElement = document.createElement('p');
      highestBidElement.textContent = `Highest bid: ${listing.highestBid} g`;
      listingElement.appendChild(highestBidElement);
  
      rowDiv.appendChild(listingElement);
    }
  }

window.addEventListener('DOMContentLoaded', displayUserListings);