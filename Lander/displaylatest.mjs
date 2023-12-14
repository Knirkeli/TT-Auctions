import { fetchListings } from './fetchposts.mjs';
export async function displayLatestListings() {
    console.log('displayLatestListings called'); // Log when the function is called

    const listings = await fetchListings();
    console.log('Fetched listings:', listings); // Log the fetched listings

    const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    const latestListings = sortedListings.slice(0, 8);
    console.log('Latest listings:', latestListings); // Log the latest listings

    // Get the new-listings div
    const newListingsDiv = document.getElementById('new-listings');
    console.log('new-listings div:', newListingsDiv); // Log the div

    // Clear the div
    newListingsDiv.innerHTML = '';

    // Create two rows
    const row1 = document.createElement('div');
    row1.className = 'row';
    const row2 = document.createElement('div');
    row2.className = 'row';

    // Create HTML for each listing and append it to the div
    latestListings.forEach((listing, index) => {
        const listingElement = document.createElement('div');
        listingElement.className = 'col-sm-3'; // Add Bootstrap 'col-sm-3' class for grid layout

        const cardElement = document.createElement('div');
        cardElement.className = 'card'; // Add Bootstrap 'card' class
        cardElement.innerHTML = `
            <img src="${listing.media[0]}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;"> <!-- Add Bootstrap 'card-img-top' class and set a fixed height -->
            <div class="card-body"> <!-- Add Bootstrap 'card-body' class -->
                <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
                <p class="card-text"><small class="text-muted">Created at: ${new Date(listing.created).toLocaleString()}</small></p> <!-- Add Bootstrap 'card-text' and 'text-muted' classes -->
            </div>
        `;
        console.log('Listing element:', cardElement); // Log the created element

        listingElement.appendChild(cardElement);

        // Append the listing to the appropriate row
        if (index < 4) {
            row1.appendChild(listingElement);
        } else {
            row2.appendChild(listingElement);
        }
    });

    // Append the rows to the new-listings div
    newListingsDiv.appendChild(row1);
    newListingsDiv.appendChild(row2);
}

// Call displayLatestListings when the window loads
document.addEventListener('DOMContentLoaded', displayLatestListings);