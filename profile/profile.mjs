import { auctionEndpoint } from '../api/api.mjs';

async function getUserProfile() {
  const response = await fetch(`${auctionEndpoint}/auction/profiles/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  return data;
}

async function getUserListings() {
  const response = await fetch(`${auctionEndpoint}/auction/profiles/me/listings`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  return data;
}

async function getUserBids() {
  const response = await fetch(`${auctionEndpoint}/auction/profiles/me/bids`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = await response.json();
  return data;
}

export { getUserProfile, getUserListings, getUserBids };