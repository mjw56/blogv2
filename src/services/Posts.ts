export const PostsService = {
  editPost: function(store, event) {
    const state = store.getState();

    // look up the post by grabbing id from the list element
    let post = state.posts.find(
      p =>
        p.timestamp ===
        parseInt(event.target.attributes["data-id"].nodeValue, 10)
    );

    document.getElementById("post-form").setAttribute("data-id", post._id);

    // populate the UI fields
    document.getElementById("title").value = post.deets.title;
    document.getElementById("content").value = post.deets.content;
    document.getElementById("file-preview").src = post.deets.cover;

    post = null;
  }
};
