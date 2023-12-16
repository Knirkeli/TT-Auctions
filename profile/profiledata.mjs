// import { getUserProfile, getUserListings, getUserBids } from './profile.mjs';

// window.onload = async () => {
//   const userProfile = await getUserProfile();
//   console.log('User avatar:', userProfile.avatar); // Log the avatar URL

//   const userListings = await getUserListings();
//   const userBids = await getUserBids();

//   // Populate user profile data
//   document.querySelector('.card-title').textContent = userProfile.name;

//   // Update the avatar image
//   const avatarImg = document.getElementById('avatar-img');
//   if (userProfile.avatar) {
//     avatarImg.src = userProfile.avatar;
//   } else {
//     avatarImg.src = 'default-avatar.jpg'; // Replace with your default avatar URL
//   }

//   // Get the row div inside my-listings-container
//   const rowDiv = document.querySelector('#my-listings-container .row');

//   // Only clear the row div and populate it with listings if the fetch was successful
//   if (userListings && userListings.length > 0) {
//     // Clear the row div
//     rowDiv.innerHTML = '';

//     // Create HTML for each listing and append it to the row div
//     userListings.slice(0, 3).forEach((listing, index) => {
//       const listingElement = document.createElement('div');
//       listingElement.className = 'col-sm-4';

//       // Use the first media item if it exists, otherwise use a default image
//       const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

//       const imgElement = document.createElement('img');
//       imgElement.src = imageUrl;
//       imgElement.alt = '';
//       imgElement.className = 'img-thumbnail';
//       listingElement.appendChild(imgElement);

//       const pElement = document.createElement('p');
//       if (listing.bids && listing.bids.length > 0) {
//         pElement.textContent = `${listing.bids[listing.bids.length - 1].amount} g`;
//       } else {
//         pElement.textContent = 'No bids';
//       }
//       listingElement.appendChild(pElement);

//       rowDiv.appendChild(listingElement);
//     });
//   }
// };
import { auctionEndpoint } from '../api/api.mjs';
import { getUserProfile, getUserListings, getUserBids } from './profile.mjs';
window.onload = async () => {
  const userProfile = await getUserProfile();
  console.log('User avatar:', userProfile.avatar); // Log the avatar URL

  const userListings = await getUserListings();
  const userBids = await getUserBids();

  // Populate user profile data
  document.querySelector('.card-title').textContent = userProfile.username;
  document.querySelector('#gold-count-profile').textContent = `${userProfile.gold} gold`;

  // Update the avatar image
  const avatarImg = document.getElementById('avatar-img');
  if (userProfile.avatar) {
    avatarImg.src = userProfile.avatar;
  } else {
    avatarImg.src = 'default-avatar.jpg'; // Replace with your default avatar URL
  }

  // Get the row div inside my-listings-container
  const rowDiv = document.querySelector('#my-listings-container .row');

  // Only clear the row div and populate it with listings if the fetch was successful
  if (userListings && userListings.length > 0) {
    // Clear the row div
    rowDiv.innerHTML = '';

    // Create HTML for each listing and append it to the row div
    userListings.slice(0, 3).forEach((listing, index) => {
      const listingElement = document.createElement('div');
      listingElement.className = 'col-sm-4';

      // Use the first media item if it exists, otherwise use a default image
      const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';

      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = '';
      imgElement.className = 'img-thumbnail';
      listingElement.appendChild(imgElement);

      const pElement = document.createElement('p');
      if (listing.bids && listing.bids.length > 0) {
        pElement.textContent = `${listing.bids[listing.bids.length - 1].amount} g`;
      } else {
        pElement.textContent = 'No bids';
      }
      listingElement.appendChild(pElement);

      rowDiv.appendChild(listingElement);
    });
  }

  // Get the row div inside my-bids-container
  const bidsRowDiv = document.querySelector('#my-bids-container .row');

  // Only clear the row div and populate it with bids if the fetch was successful
  if (userBids && userBids.length > 0) {
    // Sort the bids by the `created` date in descending order
    userBids.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Take the last 3 bids
    const lastThreeBids = userBids.slice(-3);

    // Clear the row div
    bidsRowDiv.innerHTML = '';

    // Create HTML for each bid and append it to the row div
    for (const bid of lastThreeBids) {
      const listing = bid.listing;
    
      const bidElement = document.createElement('div');
      bidElement.className = 'col-sm-4';
    
      // Use the first media item if it exists, otherwise use a default image
      const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0] : 'https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain';
    
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = '';
      imgElement.className = 'img-thumbnail';
      bidElement.appendChild(imgElement);
    
      const pElement = document.createElement('p');
      pElement.textContent = `${bid.amount} g`;
      bidElement.appendChild(pElement);
    
      bidsRowDiv.appendChild(bidElement);
    }
  }
};