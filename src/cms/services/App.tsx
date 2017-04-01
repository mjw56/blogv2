import { githubLoginFlow } from './Github';

export const AppService = {
  login: function({ store, Api }) {
      githubLoginFlow(Api).then(function() {
          store.updateState({ auth: true });
          Api.callGitHub('/user');
      });
  },

  goHome: function(store) {
    store.updateState({ panel: 'index' });
  },

  isHome: function(panel) {
    return panel === 'index';
  },
  
  goNewPost: function(store) {
    store.updateState({ panel: 'new-post' });
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