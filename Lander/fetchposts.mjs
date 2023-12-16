import { auctionEndpoint } from '../api/api.mjs';

export async function fetchAllListings() {
    let offset = 0;
    const limit = 100;
    let listings = [];
    let temp;

    do {
        const url = new URL(`${auctionEndpoint}/listings`);
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);
        url.searchParams.append('sort', 'created');
        url.searchParams.append('sortOrder', 'desc');

        const response = await fetch(url);
        temp = await response.json();

        // Filter out listings with titles that contain any of the words in the wordsToFilterOut array
        const wordsToFilterOut = [
            "test",
            "tester",
            "hei",
            "title",
            "hello",
        ];

        temp = temp.filter(
            listing =>
                !wordsToFilterOut.some(word =>
                    listing.title.toLowerCase().includes(word.toLowerCase())
                )
        );

        listings = [...listings, ...temp];
        offset += limit;
    } while (temp.length === limit);

    // Log the fetched listings
    console.log('Fetched listings:', listings);

    return listings;
}