import { auctionEndpoint } from '../api/api.mjs';
import { createLoginModal } from '../loginout/loginmodal.mjs';

export async function submitForm(event) {
    console.log('Form submitted');
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const profilePicture = form.querySelector('#profile-picture');

    // Create an object to hold the form data
    const formData = {
        name: name.value,
        email: email.value,
        password: password.value,
        avatar: profilePicture.value
    };

    // If the form data is valid, send it to the API
    const response = await fetch(`${auctionEndpoint}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    console.log('API call made');

    if (response.ok) {
        // Display a success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'User successfully created';
        form.appendChild(successMessage);


        setTimeout(() => {
            form.remove();
            createLoginModal();
        }, 3000);
    }
}