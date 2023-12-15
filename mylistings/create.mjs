// // Get the form elements
// const listingTitle = document.getElementById('listingTitle');
// const listingDescription = document.getElementById('listingDescription');
// const listingTag = document.getElementById('listingTag');
// const listingImage = document.getElementById('listingImage');
// const listingEndsAt = document.getElementById('listingEndsAt');

// async function createListing() {
//     try {
//         const token = localStorage.getItem("accessToken");

//         // Get the form values
//         const title = listingTitle.value;
//         const description = listingDescription.value;
//         const tags = [listingTag.value]; // The API expects an array of tags
//         const media = [listingImage.value]; // The API expects an array of media URLs
//         const endsAt = listingEndsAt.value;

//         const fetchOptions = {
//             method: "POST",
//             body: JSON.stringify({
//                 title,
//                 description,
//                 tags,
//                 media,
//                 endsAt,
//             }),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         const response = await fetch(
//             `https://api.noroff.dev/auction/listings`,
//             fetchOptions
//         );

//         const responseData = await response.json();
//         console.log(responseData);

//         // Store the current scroll position in localStorage
//         localStorage.setItem("scrollPosition", window.scrollY);

//         // Reload the page after creating the listing
//         window.location.reload();
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }

// // Event listener for creating a listing
// const createListingButton = document.querySelector("form button[type='submit']");

// /**
//  * @event
//  * @description Event listener for creating a listing when the button is clicked.
//  */
// createListingButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     const titleListing = document.querySelector("#listingTitle");
//     const title = titleListing.value;
//     // Check if title is empty
//     if (!title) {
//         titleListing.classList.add("border-danger");
//         titleListing.placeholder = "Title is required";
//     } else {
//         createListing();
//     }
// });

// Get the form elements
const listingTitle = document.getElementById('listingTitle');
const listingDescription = document.getElementById('listingDescription');
const listingTag = document.getElementById('listingTag');
const listingImage = document.getElementById('listingImage');
const listingEndsAt = document.getElementById('listingEndsAt');

import { auctionEndpoint } from '../api/api.mjs';

async function createListing() {
    try {
        const token = localStorage.getItem("accessToken");

        // Get the form values
        const title = listingTitle.value;
        const description = listingDescription.value;
        const tags = [listingTag.value]; // The API expects an array of tags
        const media = [listingImage.value]; // The API expects an array of media URLs
        const endsAt = listingEndsAt.value;

        console.log('Form values:', { title, description, tags, media, endsAt }); // Log the form values

        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                tags,
                media,
                endsAt,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        console.log('Fetch options:', fetchOptions); // Log the fetch options

        const response = await fetch(
            `${auctionEndpoint}/listings`,
            fetchOptions
        );

        console.log('Response:', response); // Log the response

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response data:', responseData); // Log the response data

        // Store the current scroll position in localStorage
        localStorage.setItem("scrollPosition", window.scrollY);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Event listener for creating a listing
const createListingButton = document.querySelector("form button[type='submit']");

/**
 * @event
 * @description Event listener for creating a listing when the button is clicked.
 */
createListingButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the form from being submitted

    const titleListing = document.querySelector("#listingTitle");
    const title = titleListing.value;
    // Check if title is empty
    if (!title) {
        titleListing.classList.add("border-danger");
        titleListing.placeholder = "Title is required";
    } else {
        try {
            await createListing(); // Wait for the createListing function to complete
        } catch (error) {
            console.error("An error occurred:", error);
            // If an error occurred, stop the execution of the function
            return;
        }

        // If the server accepted the data, submit the form
        event.target.form.submit();
    }
});