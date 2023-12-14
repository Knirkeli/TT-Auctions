// function openModal(content) {
//     const modal = document.createElement('div');
//     modal.innerHTML = content;
//     modal.classList.add('modal', 'fade', 'show', 'd-block');
//     modal.style.position = 'fixed';
//     modal.style.top = '50%';
//     modal.style.left = '50%';
//     modal.style.transform = 'translate(-50%, -50%)';
//     document.body.appendChild(modal);
// }

// document.getElementById('avatar-button').addEventListener('click', () => {
//     const modalContent = `
//         <div class="modal-dialog modal-dialog-centered">
//             <div class="modal-content">
//                 <div class="modal-body">
//                     <input type="text" id="img-url" class="form-control" placeholder="Enter image URL">
//                     <button id="update-button" class="btn btn-primary mt-2">Update</button>
//                 </div>
//             </div>
//         </div>
//     `;
//     openModal(modalContent);
// });

// import { auctionEndpoint } from '../api/api.mjs';

// async function updateAvatar(url) {
//     const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage
//     console.log('Username:', username); // Log the username
//     console.log('URL:', url); // Log the URL
//     const response = await fetch(`${auctionEndpoint}/auction/profiles/${username}/media`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Assuming the access token is stored in localStorage
//         },
//         body: JSON.stringify({
//             avatar: url
//         })
//     });
//     const data = await response.json();
//     console.log('Response:', data); // Log the response data
//     return data;
// }

// document.getElementById('update-button').addEventListener('click', async () => {
//     const url = document.getElementById('img-url').value;
//     const data = await updateAvatar(url);
//     console.log(data); // Log the response data
// });
import { auctionEndpoint } from '../api/api.mjs';
document.addEventListener('DOMContentLoaded', (event) => {
    

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

    async function updateAvatar(url) {
        const username = localStorage.getItem('username');
        const apiURL = `${auctionEndpoint}/profiles/${username}/media`;
        console.log('API URL:', apiURL); // Log the API URL
        console.log('Avatar URL:', url); // Log the avatar URL
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
        console.log('Response status:', response.status); // Log the response status
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        return data;
    }

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

        document.getElementById('update-button').addEventListener('click', async () => {
            const url = document.getElementById('img-url').value;
            const data = await updateAvatar(url);
            console.log(data); // Log the response data
        
            // Update the avatar in the UI
            const avatarImg = document.getElementById('avatar-img'); // Replace 'avatar-img' with the actual id of the img element in profile.html
            avatarImg.src = data.avatar;
        });
    });
});