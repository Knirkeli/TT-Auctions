import { createModal } from './logoutmodal.mjs';

document.addEventListener("DOMContentLoaded", function() {
  const logoutElement = document.getElementById("logout");
  const modal = createModal();

  logoutElement.addEventListener("click", () => {
    modal.style.display = "block";
  });

  const confirmLogoutButton = document.getElementById("confirmLogout");
  confirmLogoutButton.addEventListener("click", () => {
    console.log("Logout button clicked");
    localStorage.removeItem('accessToken');
    modal.style.display = "none";
    location.reload(); // This line reloads the page
  });
});