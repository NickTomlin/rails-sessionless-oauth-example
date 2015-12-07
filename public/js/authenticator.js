import {default as decodeJwt} from 'jwt-decode';
// this should probably be split into "authenticate" and "getUser" methods
// the implementor should be in charge of storing the token

export function initAuth () {
  console.log('creating frame');
  let frame = document.createElement('iframe')
  frame.src = 'http://localhost:3061/developer-oauth-frame.html?client_id="developer"'

  // we need to listen for the frame, which is going to eventually
  // post message a token out that we can exchange with our server
  frame.addEventListener('message', (e) => {
    console.log('we had a message from the frame');
  });

  document.body.appendChild(frame)
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
