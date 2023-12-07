/**
 * Creates a new listing and sends it to the server.
 * @async
 * @function createListing
 * @returns {Promise<void>}
 */
export const createListing = async () => {
    try {
        const title = document.querySelector("#listingTitle").value;
        const description = document.querySelector("#listingDescription").value;
        const tag = document.querySelector("#listingTag").value;
        const media = document.querySelector("#listingImage").value;
        const endsAt = new Date().toISOString(); // Set the end date

        const token = localStorage.getItem("accessToken");

        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                tags: [tag],
                media: [media],
                endsAt,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(
            `https://api.noroff.dev/auction/listings`,
            fetchOptions
        );

        const responseData = await response.json();
        console.log(responseData);

        // Store the current scroll position in localStorage
        localStorage.setItem("scrollPosition", window.scrollY);

        // Reload the page after creating the listing
        window.location.reload();
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
createListingButton.addEventListener("click", (event) => {
    event.preventDefault();
    const titleListing = document.querySelector("#listingTitle");
    const title = titleListing.value;
    // Check if title is empty
    if (!title) {
        titleListing.classList.add("border-danger");
        titleListing.placeholder = "Title is required";
    } else {
        createListing();
    }
});