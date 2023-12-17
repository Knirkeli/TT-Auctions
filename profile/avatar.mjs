import { auctionEndpoint } from '../api/api.mjs';

// The 'DOMContentLoaded' event is fired when the initial HTML document has been completely loaded and parsed.
document.addEventListener('DOMContentLoaded', (event) => {
    // This function creates a modal with the provided content and appends it to the body of the document.
    function openModal(content) {
        const modal = document.createElement('div');
        modal.innerHTML = content;
        modal.classList.add('modal', 'fade', 'show', 'd-block');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(modal);
    }

    // This function finds the modal in the document and removes it.
    function closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    // This async function sends a PUT request to the API to update the avatar URL.
    async function updateAvatar(url) {
        const username = localStorage.getItem('name');
        const apiURL = `${auctionEndpoint}/profiles/${username}/media`;
        const response = await fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                avatar: url
            })
        });
        const data = await response.json();
        return data;
    }

    // This event listener opens the modal when the 'avatar-button' is clicked.
    document.getElementById('avatar-button').addEventListener('click', () => {
        const modalContent = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <input type="text" id="img-url" class="form-control" placeholder="Enter image URL">
                        <button id="update-button" class="btn btn-primary mt-2">Update</button>
                    </div>
                </div>
            </div>
        `;
        openModal(modalContent);

        // This event listener updates the avatar when the 'update-button' is clicked.
        document.getElementById('update-button').addEventListener('click', async () => {
            const url = document.getElementById('img-url').value;
            const data = await updateAvatar(url);
        
            // Update the avatar in the UI
            const avatarImg = document.querySelector('#img1 image'); // Select the image element inside the SVG pattern
            avatarImg.setAttribute('xlink:href', data.avatar);

            // Close the modal
            closeModal();
        });
    });
});