var lock = new Auth0Lock('trZt8y3wMEf8WenAwcrmNLGKLh0d3nkT', 'therotation.auth0.com')
var form = document.querySelector('#login')
var apiRequestButton = document.querySelector('#api-request')
var apiRequestResult = document.querySelector('#api-request-result')
var authStatus = document.querySelector('#auth-status')
var token

function authenticate (data) {
  authStatus.textContent = 'Authenticated'
  form.style.display = 'none'
  token = data.token
}

form.addEventListener('submit', (e) => {
  console.log('form submit');
  e.preventDefault()
  fetch('/knock/auth_token', {
    method: 'POST',
    body: new FormData(form)
  })
  .then((r) => { return r.json() })
  .then((data) => {
    console.log('response from server', data)
    authenticate(data)
  })
  .catch((e) => {
    console.log('fetch err', e)
  })
})

apiRequestButton.addEventListener('click', () => {
  var id_token = localStorage.getItem('id_token')
  if (!id_token) { return }

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
      return
    }

    console.log('Api Request Okay')
    response
      .text()
      .then((text) => {
        apiRequestResult.textContent = text
      })
  })
})

var userProfile = null

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid'  }  })
})

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
    if (err) {
      return alert('There was an error geting the profile: ' + err.message)
    }
    document.getElementById('name').textContent = profile.name
    authenticate({token: id_token})
  })
}
