import { githubLoginFlow } from './Github';

export const AppService = {
  login: function({ store, Api }) {
      githubLoginFlow(Api).then(function() {
          store.updateState({ auth: true });
          Api.callGitHub('/user');
      });
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