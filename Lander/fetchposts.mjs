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

export async function fetchListings(limit = 100, offset = 0) {
    const url = new URL(`${auctionEndpoint}/listings`);
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);
    url.searchParams.append('sort', 'created');
    url.searchParams.append('sortOrder', 'desc');

    const response = await fetch(url);
    let listings = await response.json();

    // Filter out listings with titles that contain any of the words in the wordsToFilterOut array
    const wordsToFilterOut = [
      "test",
      "tester",
      "hei",
      "title",
      "hello",
    ];

    listings = listings.filter(
      listing =>
        !wordsToFilterOut.some(word =>
          listing.title.toLowerCase().includes(word.toLowerCase())
        )
    );

    // Log the fetched listings
    console.log('Fetched listings:', listings);

    return listings;
}
  
// async function displayLatestListings() {
//     const listings = await fetchListings();
//     const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
//     const latestListings = sortedListings.slice(0, 8);
//     }



// // Call displayLatestListings to fetch the listings and start the timer
// displayLatestListings();