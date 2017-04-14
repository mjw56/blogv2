import Component from "inferno-component";
import createElement from "inferno-create-element";
import { linkEvent } from "inferno";

function handlePostClick({ post, store }) {
  store.updateState({ route: "post", postToEdit: post });
}

// Posts
export class Posts extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      haveConfig: false,
      posts: []
    };
  }

  componentDidMount() {
    // grab config which has post slugs
    this.context.api
      .request("/repos/:username/fuusio/contents/config.json")
      .then(res => {
        try {
          const config = JSON.parse(window.atob(res.content));

          this.setState({
            haveConfig: true,
            config,
            posts: Object.keys(config.posts)
          });
        } catch (e) {
          console.log(
            "Posts Component: there was an error parsing the config",
            e
          );
        }
      });
  }

  render() {
    const { haveConfig, config, posts } = this.state;
    const { store } = this.context;
    return (
      <div className="posts-list">
        {haveConfig
          ? posts.length
              ? <ul>
                  {posts.map(slug => (
                    <li
                      onClick={linkEvent(
                        { post: config.posts[slug], store },
                        handlePostClick
                      )}
                    >
                      {config.posts[slug].title}
                    </li>
                  ))}
                </ul>
              : <h1>No Posts Yet</h1>
          : null}
      </div>
    );
  }
}
