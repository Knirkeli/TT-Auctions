// document.addEventListener('DOMContentLoaded', () => {
//     const listings = document.querySelectorAll('.listing');

//     listings.forEach(listing => {
//         listing.addEventListener('click', function() {
//             const listingId = this.getAttribute('data-id');
//             console.log(`Listing with ID ${listingId} was clicked.`);
//             console.log('Clicked element:', this); // Log the clicked element
//             window.location.href = `single.html?id=${listingId}`;
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        // Find the closest ancestor of the clicked element (or the clicked element itself) which has the 'listing' class
        const listing = event.target.closest('.listing');

        if (listing) {
            const listingId = listing.getAttribute('data-id');
            console.log(`Listing with ID ${listingId} was clicked.`);
            console.log('Clicked element:', listing); // Log the clicked element
            window.location.href = `single.html?id=${listingId}`;
        } else {
            console.log('Clicked element:', event.target);
        }
    });
});