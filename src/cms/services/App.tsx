import { githubLoginFlow } from './Github';

export const AppService = {
  // login user
  login: function({ api, store }) {
      const rememberMe = !!document.querySelector('#login-cbx:checked');

      // login to github, set the user deets
      githubLoginFlow(api, rememberMe).then(function(user) {
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
  }
}