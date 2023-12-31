import { fetchAllListings } from './fetchposts.mjs';

document.getElementById('search_button').addEventListener('click', async () => {
    const searchInput = document.getElementById('search_input').value.toLowerCase();
    const listings = await fetchAllListings();
    const filteredListings = listings.filter(listing => listing.title.toLowerCase().includes(searchInput));
    const sortedListings = filteredListings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    const searchResults = sortedListings.slice(0, 30);

    const listingsContainer = document.getElementById('listings_container');
    listingsContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card mt-5 mb-5';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header text-center';
    cardHeader.textContent = 'Search Results';
    card.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    const row = document.createElement('div');
    row.className = 'row';
    cardBody.appendChild(row);

    searchResults.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.className = 'col-sm-3';

        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${listing.media[0]}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body text-center">
                <h5 class="card-title">${listing.title}</h5>
                <p class="card-text">Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
            </div>
        `;
        listingElement.appendChild(cardElement);
        row.appendChild(listingElement);
    });

    listingsContainer.appendChild(card);
});