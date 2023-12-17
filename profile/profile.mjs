import { auctionEndpoint } from '../api/api.mjs';

async function getUserProfile() {
  const username = localStorage.getItem('name');
  const response = await fetch(`${auctionEndpoint}/profiles/${username}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  console.log('User profile data:', data); // Log the entire response data
  return data;
}

async function getUserListings() {
  const username = localStorage.getItem('name');
  const response = await fetch(`${auctionEndpoint}/profiles/${username}/listings?_bids=true`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  return data;
}

async function getUserBids() {
  const username = localStorage.getItem('name');
  const response = await fetch(`${auctionEndpoint}/profiles/${username}/bids?_listings=true`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  return data;
}

export { getUserProfile, getUserListings, getUserBids };