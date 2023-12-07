// document.addEventListener("DOMContentLoaded", function() {
//     // Target the "log out" element
//     const logoutElement = document.getElementById("logout");
  
//     // Create a modal
//     const modal = document.createElement("div");
//     modal.classList.add("modal", "d-none", "text-center");
  
//     // Create modal dialog
//     const modalDialog = document.createElement("div");
//     modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
//     modalDialog.style.maxWidth = "400px"; // Set maximum width
  
//     // Create modal content
//     const modalContent = document.createElement("div");
//     modalContent.classList.add("modal-content");
  
//     // Create modal body
//     const modalBody = document.createElement("div");
//     modalBody.classList.add("modal-body");
  
//     // Create text element
//     const textElement = document.createElement("p");
//     textElement.textContent = "Are you sure you want to log out?";
//     modalBody.appendChild(textElement);
  
//     // Create modal footer
//     const modalFooter = document.createElement("div");
//     modalFooter.classList.add("modal-footer", "justify-content-center");
  
//     // Create buttons
//     const noButton = document.createElement("button");
//     noButton.textContent = "NO";
//     noButton.classList.add("btn", "btn-secondary");
//     noButton.addEventListener("click", () => {
//       modal.classList.replace("d-block", "d-none");
//     });
  
//     const yesButton = document.createElement("button");
//     yesButton.textContent = "YES";
//     yesButton.classList.add("btn", "btn-primary");
  
//     modalFooter.appendChild(noButton);
//     modalFooter.appendChild(yesButton);
  
//     // Append modal body and footer to modal content
//     modalContent.appendChild(modalBody);
//     modalContent.appendChild(modalFooter);
  
//     // Append modal content to modal dialog
//     modalDialog.appendChild(modalContent);
  
//     // Append modal dialog to modal
//     modal.appendChild(modalDialog);
  
//     // Append modal to the document body
//     document.body.appendChild(modal);
  
//     // Event listener for "log out" element
//     logoutElement.addEventListener("click", () => {
//       modal.classList.replace("d-none", "d-block");
//     });
// });

export function createModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal", "d-none", "text-center");
  
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
    modalDialog.style.maxWidth = "400px"; // Set the maximum width of the modal to 400px
  
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
  
    const textElement = document.createElement("p");
    textElement.textContent = "Are you sure you want to log out?";
    modalContent.appendChild(textElement);
  
    const noButton = document.createElement("button");
    noButton.textContent = "NO";
    noButton.classList.add("btn", "btn-secondary");
    noButton.addEventListener("click", () => {
      modal.classList.replace("d-block", "d-none");
    });
  
    const yesButton = document.createElement("button");
    yesButton.textContent = "YES";
    yesButton.classList.add("btn", "btn-primary");
    yesButton.id = "confirmLogout"; // Add an id to target this button in the logout file
  
    modalContent.appendChild(noButton);
    modalContent.appendChild(yesButton);
    modalDialog.appendChild(modalContent); // Append modalContent to modalDialog instead of modal
    modal.appendChild(modalDialog); // Append modalDialog to modal
    document.body.appendChild(modal);
  
    return modal;
}
  
document.addEventListener("DOMContentLoaded", function() {
    const logoutElement = document.getElementById("logout");
    const modal = createModal();
  
    logoutElement.addEventListener("click", () => {
      modal.classList.replace("d-none", "d-block");
    });
});
