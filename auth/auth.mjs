export function checkAccessToken() {
    // The `localStorage` object allows web applications to store data persistently in a user's browser.
    // Here, `getItem` is used to retrieve the value of `accessToken` from the local storage.
    // The strict inequality operator `!==` is used to check if the retrieved value is not `null`.
    // If the value is not `null`, it means an access token exists in the local storage, so the function returns `true`.
    // If the value is `null`, it means no access token exists in the local storage, so the function returns `false`.
    return localStorage.getItem('accessToken') !== null;
}