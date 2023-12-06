import { createSignUpModal } from './modal.mjs';
import { auctionEndpoint } from './api.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('#sign-up-nav');

    signUpButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const formData = createSignUpModal();

        if (formData !== null) {
            // If the form data is valid, send it to the API
            const response = await fetch(`${auctionEndpoint}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // ... handle the response ...
        }
    });
});