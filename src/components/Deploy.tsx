import Component from "inferno-component";
import createElement from "inferno-create-element";
import { linkEvent } from "inferno";

// deploy
function deploy({ api, store, component }) {
  const { user } = store.getState();

  api
    .post("deploy-site", {
      user: user.login
    })
    .then(res => res.json())
    .then(res => {
      component.setState({ url: res.url });
    })
    .catch(e => console.log("failed to deploy", e));
}

// close
function close({ store }) {
  store.updateState({ route: "index" });
}

// User Settings
export class Deploy extends Component<any, any> {
  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      url: ""
    };
  }

  render() {
    const { api, store } = this.context;

    return (
      <div className="col-lg-12 form-panel" id="settings">
        <h1>This will deploy an instance of the site to zeit servers.</h1><br />
        <input disabled value={this.state.url} />
        {this.state.url
          ? <a href={this.state.url} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-envelope-open-o" />
            </a>
          : null}
        <br /><br />
        <a
          class="ghost-btn purple"
          id="submit-btn"
          onClick={linkEvent({ component: this, api, store }, deploy)}
        >
          <span>
            Deploy
          </span>
        </a>
        <a
          class="ghost-btn orange"
          id="close-btn"
          onClick={linkEvent({ store }, close)}
        >
          <span>
            Close
          </span>
        </a>
      </div>
    );
  }
}
