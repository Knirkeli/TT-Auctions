import { auctionEndpoint } from '../api/api.mjs';

export function createLoginModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.tabIndex = -1;
    modal.role = 'dialog';

    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content signinup-modal">
                <div class="modal-header text-center">
                    <div class="text-center flex-grow-1">
                        <h5 class="modal-title">Log In</h5>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                            <div id="emailError" class="text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                            <div id="passwordError" class="text-danger"></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary">Log in</button>
                </div>
            </div>
        </div>
    `;

    const loginButton = modal.querySelector('.btn-secondary');
    loginButton.addEventListener('click', async () => {
        const emailInput = modal.querySelector('#email');
        const passwordInput = modal.querySelector('#password');
    
        try {
            const response = await fetch(`${auctionEndpoint}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data); // Log the server response
            localStorage.setItem('accessToken', data.accessToken);

            // Store the user's name in local storage
            localStorage.setItem('username', data.name);

            modal.remove();
            location.reload();
        } catch (error) {
            console.error('Login failed:', error);
        }
    });

    document.body.appendChild(modal);
}

// Add the click event listener to the "Log In" nav element
const navLogin = document.querySelector('#log-in-nav');
navLogin.addEventListener('click', createLoginModal);