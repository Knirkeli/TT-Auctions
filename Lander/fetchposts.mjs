// import { auctionEndpoint } from '../api/api.mjs';

// export async function fetchListings() {
//     const response = await fetch(`${auctionEndpoint}/listings`);
//     const listings = await response.json();
//     return listings;
// }

//   async function displayLatestListings() {
//     const listings = await fetchListings();
//     const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
//     const latestListings = sortedListings.slice(0, 8);
    
//     // TODO: Display the latest listings in the HTML
//   }


// function startTimer(endTime) {
//     const timerElement = document.getElementById('timer');
//     const end = new Date(endTime);
  
//     setInterval(() => {
//       const now = new Date();
//       const distance = end - now;
  
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
//       timerElement.textContent = `${hours}:${minutes}:${seconds}`;
//     }, 1000);
//   }
  
//   // Start the timer for the first listing
//   startTimer(latestListings[0].endsAt);

import { auctionEndpoint } from '../api/api.mjs';

export async function fetchListings() {
    const response = await fetch(`${auctionEndpoint}/listings`);
    const listings = await response.json();
    return listings;
}

async function displayLatestListings() {
    const listings = await fetchListings();
    const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    const latestListings = sortedListings.slice(0, 8);
    
    // TODO: Display the latest listings in the HTML

    // Start the timer for the first listing
    if (latestListings.length > 0) {
        startTimer(latestListings[0].endsAt);
    }
}

function startTimer(endTime) {
    const timerElement = document.getElementById('timer');
    const end = new Date(endTime);
  
    setInterval(() => {
      const now = new Date();
      const distance = end - now;
  
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Call displayLatestListings to fetch the listings and start the timer
displayLatestListings();