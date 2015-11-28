var lock = new Auth0Lock('trZt8y3wMEf8WenAwcrmNLGKLh0d3nkT', 'therotation.auth0.com')
var apiRequestButton = document.querySelector('#api-request')
var apiRequestResult = document.querySelector('#api-request-result')
var authStatus = document.querySelector('#auth-status')
var logoutButton = document.querySelector('#logout');

function authenticate (data) {
  authStatus.textContent = 'Authenticated'
  logoutButton.style.display = 'block'
}

function logout () {
  localStorage.removeItem('id_token')
  window.location = '/'
}

function apiRequest () {
  var id_token = localStorage.getItem('id_token') || '';

  fetch('/api/status', {
    headers: {
      'Authorization': 'Bearer ' + id_token
    },
    method: 'GET',
    cache: false
  })
  .then((response) => {
    if (!response.ok) {
      console.log('API REQUEST NOT OKAY')
    } else {
      console.log('Api Request Okay')
    }

    response
    .text()
    .then((text) => {
      apiRequestResult.textContent = `${response.status} - ${text}`
    })
  })
}

function initializeAuth () {
  // if we are following a redirect
  var hash = lock.parseHash(window.location.hash)

  if (hash && hash.id_token) {
    //save the token in the session:
    localStorage.setItem('id_token', hash.id_token)
  }

  if (hash && hash.error) {
    alert('There was an error: ' + hash.error + '\n' + hash.error_description)
  }

  var id_token = localStorage.getItem('id_token')
  if (id_token) {
    lock.getProfile(id_token, function (err, profile) {
      console.log(profile);
      if (err) {
        return alert('There was an error geting the profile: ' + err.message)
      }
      document.getElementById('name').textContent = profile.name
      authenticate({token: id_token})
    })
  }
}


logoutButton.addEventListener('click', logout)
apiRequestButton.addEventListener('click', apiRequest)
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid'  }  })
})

initializeAuth()
