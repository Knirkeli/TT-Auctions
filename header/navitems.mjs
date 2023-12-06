import { checkAccessToken } from '../auth/auth.mjs';

const nav = document.querySelector('.navbar'); // Select the navbar
const loginNav = document.querySelector('#log-in-nav');
const signUpNav = document.querySelector('#sign-up-nav');

if (checkAccessToken()) {
    // If access token exists, remove 'Log In' and 'Sign Up' and add 'Profile', 'Bids', and 'Log Out'
    loginNav.remove();
    signUpNav.remove();

    const profileNav = document.createElement('a');
    profileNav.className = 'navbar-brand';
    profileNav.href = '#';
    profileNav.textContent = 'Profile';

    const bidsNav = document.createElement('a');
    bidsNav.className = 'navbar-brand';
    bidsNav.href = '#';
    bidsNav.textContent = 'Bids';

    const logoutNav = document.createElement('a');
    logoutNav.className = 'navbar-brand';
    logoutNav.href = '#';
    logoutNav.textContent = 'Log Out';

    nav.appendChild(profileNav);
    nav.appendChild(bidsNav);
    nav.appendChild(logoutNav);
} else {
    // If access token does not exist, do nothing or add 'Log In' and 'Sign Up' if they are not already there
}