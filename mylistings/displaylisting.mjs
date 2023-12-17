// import { auctionEndpoint } from '../api/api.mjs';

// // Get the listing ID from the URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const listingId = urlParams.get('id');

// // Fetch data for the listing from the server
// fetch(`${auctionEndpoint}/listings/${listingId}`)
//     .then(response => response.json())
//     .then(data => {
//         // Populate the page with the listing data
//         const titleElement = document.getElementById('modal-title');
//         titleElement.textContent = data.title;
//         titleElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

//         const tagsElement = document.getElementById('modal-tags');
//         tagsElement.textContent = data.tags;
//         tagsElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

//         const mediaElement = document.getElementById('modal-media');
//         mediaElement.src = data.media;
//         mediaElement.classList.add('w-100', 'object-fit-cover', 'mb-3'); // Add Bootstrap classes

//         const descriptionElement = document.getElementById('modal-description');
//         descriptionElement.textContent = data.description;
//         descriptionElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

//         const sAtElement = document.getElementById('modal-sAt');
//         sAtElement.textContent = data.sAt;
//         sAtElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

//         const bidsElement = document.getElementById('modal-_bids');
//         bidsElement.textContent = data._bids;
//         bidsElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes
//     })
//     .catch(error => console.error('Error:', error));

import { auctionEndpoint } from '../api/api.mjs';

// Get the listing ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

// Fetch data for the listing from the server
fetch(`${auctionEndpoint}/listings/${listingId}?_seller=true&_bids=true`)
    .then(response => response.json())
    .then(data => {
        // Populate the page with the listing data
        const titleElement = document.getElementById('modal-title');
        titleElement.textContent = data.title;
        titleElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        const tagsElement = document.getElementById('modal-tags');
        tagsElement.textContent = data.tags.join(', ');
        tagsElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        const mediaElement = document.getElementById('modal-media');
        mediaElement.src = data.media[0]; // Assuming media is an array of URLs
        mediaElement.classList.add('w-100', 'object-fit-cover', 'mb-3'); // Add Bootstrap classes

        const descriptionElement = document.getElementById('modal-description');
        descriptionElement.textContent = data.description;
        descriptionElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        const endsAtDate = new Date(data.endsAt);
        const formattedEndsAt = endsAtDate.toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        const sAtElement = document.getElementById('modal-sAt');
        sAtElement.textContent = formattedEndsAt;
        sAtElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        // Add new elements for seller and bids data
        const sellerElement = document.getElementById('modal-seller');
        sellerElement.textContent = `Seller: ${data.seller.name}`;
        sellerElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        const bidsElement = document.getElementById('modal-bids');
        bidsElement.textContent = `Bids: ${data.bids.length}`;
        bidsElement.classList.add('text-center', 'mb-3'); // Add Bootstrap classes

        // Sort the bids by the created date in descending order and take the first three
        const latestBids = data.bids.sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 3);

        // Create a list element to display the latest bids
        const bidsListElement = document.getElementById('modal-bids-list');
        bidsListElement.innerHTML = ''; // Clear any existing bids

        latestBids.forEach(bid => {
            const listItem = document.createElement('li');
            listItem.textContent = `Bidder: ${bid.bidderName}, Amount: ${bid.amount}, Date: ${new Date(bid.created).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
            bidsListElement.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));