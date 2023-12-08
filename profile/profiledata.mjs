import { getUserProfile, getUserListings, getUserBids } from './profile.mjs';

window.onload = async () => {
  const userProfile = await getUserProfile();
  const userListings = await getUserListings();
  const userBids = await getUserBids();

  // Populate user profile data
  document.querySelector('.card-text').textContent = userProfile.username;
  document.querySelector('.card-footer p').textContent = `${userProfile.gold} gold`;

  // Populate user listings data
  const listingsCard = document.querySelector('.listings-card');
  userListings.forEach(listing => {
    const img = document.createElement('img');
    img.src = listing.image;
    listingsCard.appendChild(img);

    const p = document.createElement('p');
    p.textContent = `${listing.price} g`;
    listingsCard.appendChild(p);
  });

  // Populate user bids data
  const bidsCard = document.querySelector('.bids-card');
  userBids.forEach(bid => {
    const img = document.createElement('img');
    img.src = bid.image;
    bidsCard.appendChild(img);

    const p = document.createElement('p');
    p.textContent = `${bid.price} g`;
    bidsCard.appendChild(p);
  });
};