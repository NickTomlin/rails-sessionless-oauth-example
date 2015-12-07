import {apiRequest} from './api';
import {authenticate, initAuth} from './authenticator';

var apiRequestButton = document.querySelector('#api-request')
var authStatus = document.querySelector('#auth-status')
var logoutButton = document.querySelector('#logout')
var customOauthFlow = document.querySelector('#oauth-login-init')

function authenticatedState (userData) {
  document.querySelector('#name').textContent = userData.display_name
  authStatus.textContent = 'Authenticated'
  logoutButton.style.display = 'block'
}

function logout () {
  localStorage.removeItem('id_token')
  window.location = '/'
}

customOauthFlow.addEventListener('click', initAuth)

logoutButton.addEventListener('click', logout)
apiRequestButton.addEventListener('click', apiRequest)

authenticate()
  .then(authenticatedState)
