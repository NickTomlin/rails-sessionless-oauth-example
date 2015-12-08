Rails Sessionless Auth Example
===

Note: I built this for me, not for anyone else. As such it's probably not going to be useful for you. Cheers :)

This is heavily inspired / copied from [knock](https://github.com/nsarno/knock) library and the login-as-a-service provider [auth0](https://auth0.com/). I am doing this to learn, not to make an amazing product, so you are better off using auth0 than copying from this example.

Getting up and running
---

Copy `config/secrets.example.yml` to `config/secrets.yml`. If you want to test login with Google, you will need to follow the [basic steps](https://developers.google.com/identity/protocols/OAuth2#basicsteps) to set up an OAuth application (With a correct redirect url) and replace the `google_client_id` and `google_client_secret` with the ones you obtain from the google developer console and and `google_callback_url` with the whatever the redirect url for your application is (typically `http://<your rails host>:<your rails port>/auth/google/callback`).

```
bundle
bundle exec rails start
```


Todo
---

* Use an iframe to handle the oauth / token flow without needing a redirect / exposed token in the hash
* Prettify
* Browserify/webpack assets
