import { githubLoginFlow } from './Github';
import { Api } from './Api';

export const AppService = {
  login: function({ store }) {
      const rememberMe = !!document.querySelector('#login-cbx:checked');

      githubLoginFlow(Api, rememberMe).then(function() {
          store.updateState({ auth: true, route: 'index' });
          Api.callGitHub('/user');
      });
  },

  logout: function(store) {
    Api.eraseToken();
    store.updateState({ auth: false, route: 'login' });
  },

  getPosts: function() {
    return new Promise(function(resolve, reject) {
        fetch('/get-posts')
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
  }
}