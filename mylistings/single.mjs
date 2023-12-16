// // Assuming listings are div elements with class 'listing'
// const listings = document.querySelectorAll('.listing');

// listings.forEach(listing => {
//     listing.addEventListener('click', function() {
//         // Assuming the listing data is stored in data attributes
//         const title = this.getAttribute('data-title');
//         const tags = this.getAttribute('data-tags');
//         const media = this.getAttribute('data-media');
//         const description = this.getAttribute('data-description');
//         const sAt = this.getAttribute('data-sAt');
//         const _bids = this.getAttribute('data-_bids');

//         // Create modal and populate it with data
//         const modal = document.createElement('div');
//         modal.innerHTML = `
//             <h2>${title}</h2>
//             <p>${tags}</p>
//             <img src="${media}" alt="${title}">
//             <p>${description}</p>
//             <p>${sAt}</p>
//             <p>${_bids}</p>
//         `;

//         // Add some style to the modal
//         modal.style.position = 'fixed';
//         modal.style.top = '50%';
//         modal.style.left = '50%';
//         modal.style.transform = 'translate(-50%, -50%)';
//         modal.style.backgroundColor = '#fff';
//         modal.style.padding = '20px';
//         modal.style.borderRadius = '10px';
//         modal.style.width = '80%';
//         modal.style.maxWidth = '600px';

//         // Append modal to body
//         document.body.appendChild(modal);
//     });
// });
import { auctionEndpoint } from '../api/api.mjs';

// Assuming listings are div elements with class 'listing'
const listings = document.querySelectorAll('.listing');

listings.forEach(listing => {
    listing.addEventListener('click', function() {
        console.log('Listing clicked'); // Log when a listing is clicked

        // Assuming the listing ID is stored in a data attribute
        const listingId = this.getAttribute('data-id');
        console.log('Listing ID:', listingId); // Log the ID of the clicked listing

        // Fetch data for the clicked listing from the server
        fetch(`${auctionEndpoint}/${listingId}`)
            .then(response => {
                console.log('Response:', response); // Log the response from the server
                return response.json();
            })
            .then(data => {
                console.log('Data:', data); // Log the data received from the server

                // Create modal and populate it with data
                const modal = document.createElement('div');
                modal.classList.add('modal', 'fade');
                modal.id = 'listing-modal';
                modal.tabIndex = -1;
                modal.role = 'dialog';
                modal.setAttribute('aria-labelledby', 'listingModalLabel');
                modal.setAttribute('aria-hidden', 'true');

                modal.innerHTML = `
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal-title">${data.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p id="modal-tags">${data.tags}</p>
                                <img id="modal-media" src="${data.media}" alt="${data.title}" class="img-fluid">
                                <p id="modal-description">${data.description}</p>
                                <p id="modal-sAt">${data.sAt}</p>
                                <p id="modal-_bids">${data._bids}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Append modal to body
                document.body.appendChild(modal);
                // Trigger the modal to show
                $(modal).modal('show');
            })
            .catch(error => console.error('Error:', error));
    });
});