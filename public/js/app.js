var apiRequestButton = document.querySelector('#api-request')
var apiRequestResult = document.querySelector('#api-request-result')
var authStatus = document.querySelector('#auth-status')
var logoutButton = document.querySelector('#logout')

function authenticatedState (userData) {
  authStatus.textContent = 'Authenticated'
  logoutButton.style.display = 'block'
}

function logout () {
  localStorage.removeItem('id_token')
  window.location = '/'
}

logoutButton.addEventListener('click', logout)
apiRequestButton.addEventListener('click', apiRequest)

authenticate()
  .then(authenticatedState)
