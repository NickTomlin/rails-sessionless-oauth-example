import {default as decodeJwt} from 'jwt-decode';
// this should probably be split into "authenticate" and "getUser" methods
// the implementor should be in charge of storing the token

export function initAuth () {
  let frame = document.createElement('iframe')
  frame.src = 'http://localhost:3060/?client_id="developer"'

  // we need to listen for the frame, which is going to eventually
  // post message a token out that we can exchange with our server
  window.addEventListener('message', (e) => {
    console.log('we received a postMessage', e)
  })

  document.body.appendChild(frame)

  frame.addEventListener('load', function () {
    frame.contentWindow.postMessage('parent dawg', 'http://localhost:3060')
    frame.addEventListener('message', function (e) {
      console.log('frame message', e);
    })
  })
}

export function authenticate () {
  return new Promise((resolve, reject) => {
    var tokenToLoad;
    var results = window.location.hash.split(/#?auth_token=/)
    var savedToken = localStorage.getItem('id_token')
    var hashToken = results && results[1]

    if (hashToken) {
      localStorage.setItem('id_token', hashToken)
      window.location.hash = ''
    }

    tokenToLoad = hashToken || savedToken

    if (tokenToLoad) {
      var tokenData = decodeJwt(tokenToLoad)
      var userData = tokenData.user
      resolve(userData)
    }
  })
}
