import { githubLoginFlow } from './Github';

export const AppService = {
  login: function({ store, Api }) {
      githubLoginFlow(Api).then(function() {
          store.updateState({ auth: true });
          Api.callGitHub('/user');
      });
  },

  getPosts: function(store) {
    fetch('/get-posts')
        .then(res => res.json())
        .then(posts => {
            // after data success re-render
            store.updateState({ posts })
        });
  }
}