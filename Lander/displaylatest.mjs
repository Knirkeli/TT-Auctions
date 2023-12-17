// import { fetchAllListings } from './fetchposts.mjs';

// export async function displayLatestListings() {
//     console.log('displayLatestListings called'); // Log when the function is called

//     const listings = await fetchAllListings();
//     console.log('Fetched listings:', listings); // Log the fetched listings

//     // Get the new-listings div
//     const newListingsDiv = document.getElementById('new-listings');
//     console.log('new-listings div:', newListingsDiv); // Log the div

// // Clear the div
// newListingsDiv.innerHTML = '';

// // Initialize a variable to keep track of the number of displayed listings
// let displayedCount = 0;

// // Function to display listings
// function displayListings(listings, count) {
//     // Create two rows
//     const row1 = document.createElement('div');
//     row1.className = 'row mb-3'; // Add Bootstrap 'row' and 'mb-3' classes
//     const row2 = document.createElement('div');
//     row2.className = 'row mb-3'; // Add Bootstrap 'row' and 'mb-3' classes

//     listings
//         .sort((a, b) => {
//             const dateA = new Date(a.created);
//             dateA.setHours(0, 0, 0, 0);

//             const dateB = new Date(b.created);
//             dateB.setHours(0, 0, 0 , 0);

//             return dateB - dateA; // Sort listings from newest to oldest
//         })
//         .slice(displayedCount, displayedCount + count) // Get the next 'count' listings
//         .forEach((listing, index) => {
//             const listingElement = document.createElement('div');
//             listingElement.className = 'col-sm-3 listing position-relative'; // Add Bootstrap 'col-sm-3' and 'position-relative' classes for grid layout and 'listing' class

//             const cardElement = document.createElement('div');
//             cardElement.className = 'card listing-card bg-dark text-black'; // Add Bootstrap 'card', 'bg-dark', 'text-white', 'rounded', and 'border' classes

//             // Use the first media item if it exists, otherwise use a default image
//             const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

//             cardElement.innerHTML = `
//                 <img src="${imageUrl}" class="card-img" alt="${listing.title}" style="height: 100%; object-fit: cover;"> <!-- Add Bootstrap 'card-img' class and set a fixed height -->
//                 <div class="card-img-overlay d-flex align-items-start justify-content-center"> <!-- Add Bootstrap 'card-img-overlay', 'd-flex', 'align-items-start' and 'justify-content-center' classes -->
//                     <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
//                 </div>
//             `;

//             listingElement.appendChild(cardElement);

//             // Append the listing to the appropriate row
//             if (index < 4) {
//                 row1.appendChild(listingElement);
//             } else {
//                 row2.appendChild(listingElement);
//             }
//         });

//     // Append the rows to the new-listings div
//     newListingsDiv.appendChild(row1);
//     newListingsDiv.appendChild(row2);

//     // Update the number of displayed listings
//     displayedCount += count;
// }

// // Display the first 8 listings
// displayListings(listings, 8);
// }

// // Call displayLatestListings when the window loads
// document.addEventListener('DOMContentLoaded', displayLatestListings);

import { fetchAllListings } from './fetchposts.mjs';

export async function displayLatestListings() {
    console.log('displayLatestListings called'); // Log when the function is called

    const listings = await fetchAllListings();
    console.log('Fetched listings:', listings); // Log the fetched listings

    // Get the new-listings div
    const newListingsDiv = document.getElementById('new-listings');
    console.log('new-listings div:', newListingsDiv); // Log the div

    // Clear the div
    newListingsDiv.innerHTML = '';

    // Initialize a variable to keep track of the number of displayed listings
    let displayedCount = 0;

    // Function to display listings
    function displayListings(listings, count) {
        // Create a container
        const container = document.createElement('div');
        container.className = 'container'; // Add Bootstrap 'container' class

        let row; // Declare row outside the loop

        listings
            .sort((a, b) => {
                const dateA = new Date(a.created);
                dateA.setHours(0, 0, 0, 0);

                const dateB = new Date(b.created);
                dateB.setHours(0, 0, 0 , 0);

                return dateB - dateA; // Sort listings from newest to oldest
            })
            .slice(displayedCount, displayedCount + count) // Get the next 'count' listings
            .forEach((listing, index) => {
                // Create a new row for every four listings on large and larger screens, every two listings on medium screens, and for each listing on small and extra small screens
                if (index % 4 === 0) {
                    row = document.createElement('div');
                    row.className = 'row mb-3 justify-content-center'; // Add Bootstrap 'row', 'mb-3' and 'justify-content-center' classes
                    container.appendChild(row);
                }

                const listingElement = document.createElement('div');
                // Use Bootstrap's 'col-' classes for responsiveness and 'mb-3' for bottom margin and 'mt-3' for top margin
                listingElement.className = 'col-12 col-sm-6 col-lg-3 mb-3 mt-3 listing position-relative'; // Add Bootstrap 'col-12', 'col-sm-6', 'col-lg-3', 'mb-3', 'mt-3' and 'position-relative' classes for grid layout, margin and 'listing' class
                listingElement.setAttribute('data-id', listing.id); // Add 'data-id' attribute

                const cardElement = document.createElement('div');
                cardElement.className = 'card listing-card bg-dark text-black rounded border border-dark'; // Add Bootstrap 'card', 'bg-dark', 'text-white', 'rounded', and 'border' classes

                // Use the first media item if it exists, otherwise use a default image
                const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

                cardElement.innerHTML = `
                    <img src="${imageUrl}" class="card-img" alt="${listing.title}" style="height: 100%; object-fit: cover;"> <!-- Add Bootstrap 'card-img' class and set a fixed height -->
                    <div class="card-img-overlay d-flex align-items-start justify-content-center"> <!-- Add Bootstrap 'card-img-overlay', 'd-flex', 'align-items-start' and 'justify-content-center' classes -->
                        <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
                    </div>
                `;

                listingElement.appendChild(cardElement);

                // Append the listing to the current row
                row.appendChild(listingElement);
            });

        // Append the container to the new-listings div
        newListingsDiv.appendChild(container);

        // Update the number of displayed listings
        displayedCount += count;
    }

    // Display the first 8 listings
    displayListings(listings, 8);
}

// Call displayLatestListings when the window loads
document.addEventListener('DOMContentLoaded', displayLatestListings);