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
                            </div>
  
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                            </div>
  
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>

                            <div class="form-group">
                                <label for="repeat-password">Repeat Password</label>
                                <input type="password" class="form-control" id="repeat-password" name="repeat-password" required>
                            </div>
  
                            <div class="form-group">
                                <label for="profile-picture">Profile Picture URL</label>
                                <input type="url" class="form-control" id="profile-picture" name="profile-picture" required>
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
    });
});