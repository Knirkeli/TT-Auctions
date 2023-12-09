import { fetchListings } from './fetchposts.mjs';

export async function displayLatestListings() {
    const listings = await fetchListings();
    const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    const latestListings = sortedListings.slice(0, 8);
    
    // TODO: Display the latest listings in the HTML
}