import { readCookie } from './Cookies';

export const AppService = {
  // login user
  login: function({ api, store }) {
      const rememberMe = !!document.querySelector('#login-cbx:checked');

      // login to github, set the user deets
      api.login(rememberMe).then(function(user) {
          store.updateState({ auth: true, route: 'index', user: user });
      });
  },

  // logout user
  logout: function({ api, store }) {
    store.updateState({ auth: false, route: 'login' });
  },

  // get list of posts
  // TODO
  getPosts: function() {
    return new Promise(function(resolve, reject) {
        fetch('/get-posts')
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
  },

  // does some initialization work to read access token
  // from the cookies, and then go grab the user deets
  // with the token, it can also resolve empty if no token
  init: function() {
    return new Promise((resolve, reject) => {
      // is the access_token in the cookie?
      const access_token: string = readCookie('redacted');

      if (typeof access_token === 'string' && access_token !== '') {
          // call github to get user deets
          fetch(`https://api.github.com/user`, {
              headers: {
                  Authorization: `token ${ access_token }`,
                  'Content-Type': 'application/json'
              }
          })
          .then(res => res.json())
          .then(res => resolve({ access_token, user: res }))
          .catch(err => reject(err));
      } else {
        // no user deets yet
        resolve({});
      }
    });
  }
}