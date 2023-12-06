export function checkAccessToken() {
    return localStorage.getItem('accessToken') !== null;
}