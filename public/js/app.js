var apiRequestButton = document.querySelector('#api-request')
var apiRequestResult = document.querySelector('#api-request-result')
var authStatus = document.querySelector('#auth-status')
var logoutButton = document.querySelector('#logout')

function authenticate () {
  return new Promise((resolve, reject) => {
    var savedToken = localStorage.getItem('id_token')
    var results = window.location.hash.split(/#?auth_token=/)
    var hashToken = results && results[1]

    if (hashToken) {
      window.location.hash = ''
    }

    if (savedToken) {
      return resolve(savedToken)
    }

    if (hashToken) {
      resolve(hashToken)
    }
  })
}

function authenticatedState (token) {
  localStorage.setItem('id_token', token)
  authStatus.textContent = 'Authenticated'
  logoutButton.style.display = 'block'
}

function logout () {
  localStorage.removeItem('id_token')
  window.location = '/'
}

function apiRequest () {
  var id_token = localStorage.getItem('id_token') || ''

  fetch('/api/status', {
    headers: {
      'Authorization': 'Bearer ' + id_token
    },
    method: 'GET',
    cache: false
  })
  .then((response) => {
    response
    .text()
    .then((text) => {
      apiRequestResult.textContent = `${response.status} - ${text}`
    })
  })
}

logoutButton.addEventListener('click', logout)
apiRequestButton.addEventListener('click', apiRequest)

authenticate()
  .then(authenticatedState)
