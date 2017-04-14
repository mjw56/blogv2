import Component from "inferno-component";
import createElement from "inferno-create-element";
import { linkEvent } from "inferno";

// submit the config for save
function submitConfig({ api, store, config }) {
  const token = api.getToken();
  const { user } = store.getState();

  api.post('save-config', {
    config: {
      ...config,
      stylesheet: document.getElementById('stylesheet-selector').value,
      title: document.getElementById('blog-title').value
    },
    token,
    user: {
      login: user.login,
      name: user.name
    }
  })
  .then(res => store.updateState({ route: 'index' }))
  .catch(e => console.log('failed to save config', e));
}

// close the form
function close({ store }) {
  store.updateState({ route: 'index' });
}

// User Settings
export class Settings extends Component<any, any> {
  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      config: {}
    };
  }

  componentDidMount() {
    // when it loads, go and grab config.json and populate stuff
    // into the form, when saving, POST those deets back to the 
    // server which will then upate the config.json file!
    this.context.api.request(
      "/repos/:username/fuusio/contents/config.json"
    ).then(config => {
      try {
        const parsedConfig = JSON.parse(atob(config.content));

        console.log('parsed config!', parsedConfig);
        document.getElementById('blog-title').value = parsedConfig.title;

        this.setState({
          config: parsedConfig
        });
      } catch (e) {
        console.log('Settings: failed to parse config.', e);
      }
    });
  }

  render() {
    const { api, store } = this.context;
    const { config } = this.state;
    return (
      <div className="col-lg-12 form-panel" id="settings">
        <form
              className="form-horizontal style-form"
              id="post-form"
            >
              <div className="form-group">
                <label className="col-sm-2 control-label">Blog Title</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="blog-title"
                    id="blog-title"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Stylesheet</label>
                <div className="col-sm-10">
                  <select id="stylesheet-selector" value={config.stylesheet}>
                    { (config.stylesheetOptions || []).map(o => {
                        return <option value={o}>{o}</option> 
                      })}
                  </select>
                </div>
              </div>

              <a
                class="ghost-btn purple"
                id="submit-btn"
                onClick={linkEvent({ api, store, config }, submitConfig)}
              >
                <span>
                  Save
                </span>
              </a>

              <a
                class="ghost-btn orange"
                id="submit-btn"
                onClick={linkEvent({ store }, close)}
              >
                <span>
                  Close
                </span>
              </a>
            </form>
      </div>
    );
  }
}
