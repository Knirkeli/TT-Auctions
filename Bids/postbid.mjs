// import { auctionEndpoint } from '../api/api.mjs';

// // Get the listing ID from the URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const listingId = urlParams.get('id');

// // Get the bidder's name from local storage
// const bidderName = localStorage.getItem('name');

// // Get the bidder-name input element
// const bidderNameInput = document.getElementById('bidder-name');

// // Set the value of the bidder-name input to the bidder's name
// bidderNameInput.value = bidderName;

// // Make the bidder-name input read-only
// bidderNameInput.readOnly = true;

// // Fetch the current highest bid for the listing
// fetch(`${auctionEndpoint}/listings/${listingId}?_bids=true`)
//     .then(response => response.json())
//     .then(data => {
//         // Get the bid-amount input element
//         const bidAmountInput = document.getElementById('bid-amount');

//         // Check if there are any bids
//         if (data.bids && data.bids.length > 0) {
//             // Sort the bids by amount in descending order
//             const sortedBids = data.bids.sort((a, b) => b.amount - a.amount);

//             // Set the value of the bid-amount input to the highest bid amount
//             bidAmountInput.value = sortedBids[0].amount;
//         } else {
//             // If there are no bids, set the value to 0
//             bidAmountInput.value = 0;
//         }
//     })
//     .catch(error => console.error('Error:', error));

// // Get the bid form
// const bidForm = document.getElementById('bid-form');

// // Add an event listener for the form's submit event
// bidForm.addEventListener('submit', event => {
//     // Prevent the default form submission
//     event.preventDefault();

//     // Get the bid amount from the form and convert it to a number
// const bidAmount = parseFloat(document.getElementById('bid-amount').value);

// // Get the token from local storage
// const token = localStorage.getItem('accessToken');  // Use 'accessToken' instead of 'token'

// // Send a request to the API to place the bid
// fetch(`${auctionEndpoint}/listings/${listingId}/bids`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
//     },
//     body: JSON.stringify({
//         amount: bidAmount,
//     }),
// })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(error => {
//                 throw error;
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Handle the response data
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error.errors[0]);
//     });
// });

import { auctionEndpoint } from '../api/api.mjs';

// Get the listing ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

// Get the bidder's name from local storage
const bidderName = localStorage.getItem('name');

// Get the bidder-name input element
const bidderNameInput = document.getElementById('bidder-name');

// Set the value of the bidder-name input to the bidder's name
bidderNameInput.value = bidderName;

// Make the bidder-name input read-only
bidderNameInput.readOnly = true;

// Fetch the current highest bid for the listing
fetch(`${auctionEndpoint}/listings/${listingId}?_bids=true`)
    .then(response => response.json())
    .then(data => {
        // Get the bid-amount input element
        const bidAmountInput = document.getElementById('bid-amount');

        // Check if there are any bids
        if (data.bids && data.bids.length > 0) {
            // Sort the bids by amount in descending order
            const sortedBids = data.bids.sort((a, b) => b.amount - a.amount);

            // Set the value of the bid-amount input to the highest bid amount
            bidAmountInput.value = sortedBids[0].amount;
        } else {
            // If there are no bids, set the value to 0
            bidAmountInput.value = 0;
        }
    })
    .catch(error => console.error('Error:', error));

// Get the bid form
const bidForm = document.getElementById('bid-form');

// Add an event listener for the form's submit event
bidForm.addEventListener('submit', event => {
    // Prevent the default form submission
    event.preventDefault();

    // Get the bid amount from the form and convert it to a number
    const bidAmount = parseFloat(document.getElementById('bid-amount').value);

    // Get the token from local storage
    const token = localStorage.getItem('accessToken');  // Use 'accessToken' instead of 'token'

    // Send a request to the API to place the bid
    fetch(`${auctionEndpoint}/listings/${listingId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        },
        body: JSON.stringify({
            amount: bidAmount,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw error;
            });
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data
        console.log('Success:', data);

        // Reload the page
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error.errors[0]);
    });
});