var form = document.querySelector('#login');
var apiRequestButton = document.querySelector('#api-request');
var apiRequestResult = document.querySelector('#api-request-result');
var authStatus = document.querySelector('#auth-status');
var token;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch('/knock/auth_token', {
    method: 'POST',
    body: new FormData(form)
  })
  .then((r) => { return r.json() })
  .then((data) => {
    console.log('response from server', data);
    authStatus.textContent = 'Authenticated';
    form.style.display = 'none';
    token = data.token;
  })
  .catch((e) => {
    console.log('fetch err', e);
  });
});

apiRequestButton.addEventListener('click', () => {
  fetch('/api/status')
  .then((response) => {
    if (!response.ok) {
      console.log('API REQUEST NOT OKAY');
      return;
    }

    console.log('Api Request Okay');
    response
      .text()
      .then((text) => {
        apiRequestResult.textContent = text;
      });
  });
});
