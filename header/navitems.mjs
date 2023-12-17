// import { checkAccessToken } from '../auth/auth.mjs';

// const nav = document.querySelector('.navbar'); // Select the navbar
// const loginNav = document.querySelector('#log-in-nav');
// const signUpNav = document.querySelector('#sign-up-nav');

// if (checkAccessToken()) {
//     // If access token exists, remove 'Log In' and 'Sign Up' and add 'Profile' and 'Log Out'
//     loginNav.remove();
//     signUpNav.remove();

//     const profileNav = document.createElement('a');
//     profileNav.className = 'navbar-brand';
//     profileNav.href = 'profile.html';
//     profileNav.textContent = 'Profile';

//     const logoutNav = document.createElement('a');
//     logoutNav.className = 'navbar-brand';
//     logoutNav.href = '#';
//     logoutNav.textContent = 'Log Out';
//     logoutNav.id = 'logout';

//     nav.appendChild(profileNav);
//     nav.appendChild(logoutNav);
// } else {
//     // If access token does not exist, do nothing or add 'Log In' and 'Sign Up' if they are not already there
// }

import { checkAccessToken } from '../auth/auth.mjs';

const navItemsContainer = document.querySelector('.navbar .ml-auto');
const loginNav = document.querySelector('#log-in-nav');
const signUpNav = document.querySelector('#sign-up-nav');

if (checkAccessToken()) {
    // If access token exists, remove 'Log In' and 'Sign Up' and add 'Profile' and 'Log Out'
    loginNav.remove();
    signUpNav.remove();

    const profileNav = document.createElement('a');
    profileNav.className = 'navbar-brand';
    profileNav.href = 'profile.html';
    profileNav.textContent = 'Profile';

    const logoutNav = document.createElement('a');
    logoutNav.className = 'navbar-brand';
    logoutNav.href = '#';
    logoutNav.textContent = 'Log Out';
    logoutNav.id = 'logout';

    navItemsContainer.appendChild(profileNav);
    navItemsContainer.appendChild(logoutNav);
} else {
    // If access token does not exist, do nothing or add 'Log In' and 'Sign Up' if they are not already there
}