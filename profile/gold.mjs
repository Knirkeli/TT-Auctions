import { getUserProfile } from './profile.mjs';

window.addEventListener('load', async () => {
  const userProfile = await getUserProfile();

  // Update the gold count
  const goldCountElement = document.getElementById('gold-count');
  goldCountElement.textContent = `${userProfile.credits} Gold`;
});

