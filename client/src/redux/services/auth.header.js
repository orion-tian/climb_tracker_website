export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  // if there is a logged in user w/ access token return Authorization header
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}