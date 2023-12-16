// import { getUserProfile } from './profile.mjs';

// window.addEventListener('load', async () => {
//   const userProfile = await getUserProfile();

//   // Update the gold count
//   const goldCountElement = document.getElementById('gold-count');
//   goldCountElement.textContent = `${userProfile.credits} Gold`;
// });

import { getUserProfile } from './profile.mjs';

window.addEventListener('load', async () => {
  const userProfile = await getUserProfile();

  // Update the gold count
  const goldCountElement = document.getElementById('gold-count');
  if (goldCountElement) {
    goldCountElement.textContent = `${userProfile.credits} Gold`;
  }

  // Update the gold count in profile
  const goldCountProfileElement = document.getElementById('gold-count-profile');
  if (goldCountProfileElement) {
    goldCountProfileElement.textContent = `${userProfile.credits} Gold`;
  }
});