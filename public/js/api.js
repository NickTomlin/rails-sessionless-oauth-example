var apiRequestResult = document.querySelector('#api-request-result')

export function apiRequest () {
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

