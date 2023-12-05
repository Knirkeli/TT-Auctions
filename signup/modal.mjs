document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('#sign-up-nav');
  
    signUpButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.tabIndex = -1;
        modal.role = 'dialog';
  
        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content signinup-modal">
                    <div class="modal-header text-center">
                    <div class="text-center flex-grow-1">
                    <h5 class="modal-title">Create User</h5>
                </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                        <div id="nameError" class="text-danger"></div>
                    </div>
                    
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
                    
                    <div class="form-group">
                        <label for="repeat-password">Repeat Password</label>
                        <input type="password" class="form-control" id="repeat-password" name="repeat-password" required>
                        <div id="repeatPasswordError" class="text-danger"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="profile-picture">Profile Picture URL</label>
                        <input type="url" class="form-control" id="profile-picture" name="profile-picture" required>
                        <div id="profilePictureError" class="text-danger"></div>
                    </div>
                        </form>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary">Log in</button>
                        <button type="button" class="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block'; // Show the modal
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

        const form = modal.querySelector('form');
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const password = form.querySelector('#password');
        const profilePicture = form.querySelector('#profile-picture');

        const nameError = form.querySelector('#nameError');
        const emailError = form.querySelector('#emailError');
        const passwordError = form.querySelector('#passwordError');
        const profilePictureError = form.querySelector('#profilePictureError');
        const repeatPassword = form.querySelector('#repeat-password');
        const repeatPasswordError = form.querySelector('#repeatPasswordError');

        const createButton = modal.querySelector('.btn.btn-primary');
        createButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!/^[A-Z][a-z]{2,}$/.test(name.value)) {
                nameError.innerText = 'Name must start with an uppercase letter and be more than 3 letters long.';
            } else {
                nameError.innerText = '';
            }

            if (!/^[\w.-]+@stud\.noroff\.no$/.test(email.value)) {
                emailError.innerText = 'Email must be a stud.noroff.no email.';
            } else {
                emailError.innerText = '';
            }

            if (!/^(?=.*\d).{8,}$/.test(password.value)) {
                passwordError.innerText = 'Password must have at least 8 characters and at least one number.';
            } else {
                passwordError.innerText = '';
            }

            if (!/^https?:\/\/.*\.jpg$/.test(profilePicture.value)) {
                profilePictureError.innerText = 'Profile picture URL must be a link to a .jpg image.';
            } else {
                profilePictureError.innerText = '';
            }

            if (password.value !== repeatPassword.value) {
                repeatPasswordError.innerText = 'Password does not match.';
            } else {
                repeatPasswordError.innerText = '';
            }
        });

    });
});