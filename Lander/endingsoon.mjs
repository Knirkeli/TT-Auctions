// import { fetchAllListings } from './fetchposts.mjs';

// export async function displayEndingSoonListings() {
//     console.log('displayEndingSoonListings called'); // Log when the function is called

//     const listings = await fetchAllListings();
//     console.log('Fetched listings:', listings); // Log the fetched listings

//     // Sort the listings by end time, ascending
//     const sortedListings = listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
//     console.log('Ending soon listings:', sortedListings); // Log the ending soon listings

//     // Get the ending-soon div
//     const endingSoonDiv = document.getElementById('ending_soon');
//     console.log('ending_soon div:', endingSoonDiv); // Log the div

//     // Clear the div
//     endingSoonDiv.innerHTML = '';

//     // Create a row div
//     const rowDiv = document.createElement('div');
//     rowDiv.className = 'row';

//     // Append the row to the ending-soon div
//     endingSoonDiv.appendChild(rowDiv);

//     // Function to display listings
//     function displayListings(listings, count) {
//         listings.slice(0, count).forEach((listing, index) => {
//             const listingElement = document.createElement('div');
//             listingElement.className = 'col-sm-3 listing'; // Add Bootstrap 'col-sm-3' class for grid layout and 'listing' class
//             listingElement.setAttribute('data-id', listing.id); // Add 'data-id' attribute

//             const cardElement = document.createElement('div');
//             cardElement.className = 'card'; // Add Bootstrap 'card' class

//             // Use the first media item if it exists, otherwise use a default image
//             const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

//             cardElement.innerHTML = `
//                 <img src="${imageUrl}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;"> <!-- Add Bootstrap 'card-img-top' class and set a fixed height -->
//                 <div class="card-body"> <!-- Add Bootstrap 'card-body' class -->
//                     <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
//                     <p class="card-text"><small class="text-muted">Ends at: ${new Date(listing.endsAt).toLocaleString()}</small></p> <!-- Add Bootstrap 'card-text' and 'text-muted' classes -->
//                 </div>
//             `;

//             console.log('Listing element:', cardElement); // Log the created element

//             listingElement.appendChild(cardElement);

//             // Add a click event listener to the listing element
//             listingElement.addEventListener('click', () => {
//                 // Navigate to the single listing page with the correct listing ID
//                 window.location.href = `single.html?id=${listing.id}`;
//             });

//             // Append the listing to the row
//             rowDiv.appendChild(listingElement);
//         });
//     }

//     // Display the first 8 listings
//     displayListings(sortedListings, 8);

//     // Create a Load More button
//     const loadMoreButton = document.createElement('button');
//     loadMoreButton.textContent = 'Load More';
//     loadMoreButton.addEventListener('click', () => displayListings(sortedListings, 8));
//     endingSoonDiv.appendChild(loadMoreButton);
// }

// // Call displayEndingSoonListings when the window loads
// document.addEventListener('DOMContentLoaded', displayEndingSoonListings);

import { fetchAllListings } from './fetchposts.mjs';

export async function displayEndingSoonListings() {
    console.log('displayEndingSoonListings called'); // Log when the function is called

    const listings = await fetchAllListings();
    console.log('Fetched listings:', listings); // Log the fetched listings

    // Sort the listings by end time, ascending
    const sortedListings = listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    console.log('Ending soon listings:', sortedListings); // Log the ending soon listings

    // Get the ending-soon div
    const endingSoonDiv = document.getElementById('ending_soon');
    console.log('ending_soon div:', endingSoonDiv); // Log the div

    // Clear the div
    endingSoonDiv.innerHTML = '';

    // Create a row div
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    // Append the row to the ending-soon div
    endingSoonDiv.appendChild(rowDiv);

    // Initialize a variable to keep track of the number of displayed listings
    let displayedCount = 0;

    // Function to display listings
    function displayListings(listings, count) {
        listings.slice(displayedCount, displayedCount + count).forEach((listing, index) => {
            const listingElement = document.createElement('div');
            listingElement.className = 'col-sm-3 listing'; // Add Bootstrap 'col-sm-3' class for grid layout and 'listing' class
            listingElement.setAttribute('data-id', listing.id); // Add 'data-id' attribute

            const cardElement = document.createElement('div');
            cardElement.className = 'card'; // Add Bootstrap 'card' class

            // Use the first media item if it exists, otherwise use a default image
            const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

            cardElement.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;"> <!-- Add Bootstrap 'card-img-top' class and set a fixed height -->
                <div class="card-body"> <!-- Add Bootstrap 'card-body' class -->
                    <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
                </div>
            `;

            listingElement.appendChild(cardElement);

            // Append the listing to the row
            rowDiv.appendChild(listingElement);
        });

        // Update the number of displayed listings
        displayedCount += count;
    }

    // Display the first 8 listings
    displayListings(sortedListings, 8);

    // Create a Load More button
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.addEventListener('click', () => displayListings(sortedListings, 8));
    endingSoonDiv.appendChild(loadMoreButton);
}

// Call displayEndingSoonListings when the window loads
document.addEventListener('DOMContentLoaded', displayEndingSoonListings);