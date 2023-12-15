import { auctionEndpoint } from '../api/api.mjs';

async function getUserListings() {
    const username = localStorage.getItem('name');
    const response = await fetch(`${auctionEndpoint}/profiles/${username}/listings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await response.json();
    return data;
}

export async function displayUserListings() {
    console.log('displayUserListings called'); // Log when the function is called

    const listings = await getUserListings();
    console.log('Fetched listings:', listings); // Log the fetched listings

    // Get the listings div
    const listingsDiv = document.getElementById('listings');
    console.log('listings div:', listingsDiv); // Log the div

    // Clear the div
    listingsDiv.innerHTML = '';

    // Create a container div
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // Create a row div
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    // Append the row div to the container div
    containerDiv.appendChild(rowDiv);

    // Append the container div to the listings div
    listingsDiv.appendChild(containerDiv);

    // Create HTML for each listing and append it to the row div
    listings.forEach((listing, index) => {
        console.log('Creating HTML for listing:', listing); // Log the listing being processed

        const listingElement = document.createElement('div');
        listingElement.className = 'col-md-3'; // Changed 'col-sm-3' to 'col-md-3'

        const cardElement = document.createElement('div');
        cardElement.className = 'card'; // Add Bootstrap 'card' class

        // Use the first media item if it exists, otherwise use a default image
        const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

        cardElement.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;"> <!-- Add Bootstrap 'card-img-top' class and set a fixed height -->
            <div class="card-body"> <!-- Add Bootstrap 'card-body' class -->
                <h2 class="card-title">${listing.title}</h2> <!-- Add Bootstrap 'card-title' class -->
                <p class="card-text"><small class="text-muted">Created at: ${new Date(listing.created).toLocaleString()}</small></p> <!-- Add Bootstrap 'card-text' and 'text-muted' classes -->
            </div>
        `;

        console.log('Listing element:', cardElement); // Log the created element

        listingElement.appendChild(cardElement);
        rowDiv.appendChild(listingElement); // Append to the row div instead of the listings div
    });
}

// Call displayUserListings when the window loads
window.addEventListener('DOMContentLoaded', displayUserListings);