// this should probably be split into "authenticate" and "getUser" methods
// the implementor should be in charge of storing the token

function authenticate () {
  return new Promise((resolve, reject) => {
    var tokenToLoad;
    var results = window.location.hash.split(/#?auth_token=/)
    var savedToken = localStorage.getItem('id_token')
    var hashToken = results && results[1]

    if (hashToken) {
      localStorage.setItem('id_token', hashToken)
      window.location.hash = ''
    }

    tokenToLoad = hashToken || savedToken;

    if (tokenToLoad) {
      var tokenData = window.jwt_decode(tokenToLoad)
      var userData = tokenData.user
      resolve(userData)
    }
  })
}
