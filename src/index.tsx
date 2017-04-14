import { linkEvent, render } from "inferno";
import createElement from "inferno-create-element";

// components
import { Provider } from "./components/Provider";
import { Route } from "./components/Route";
import { AuthRoute } from "./components/AuthRoute";
import { App } from "./components/App";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import { Settings } from "./components/Settings";
import { Deploy } from "./components/Deploy";

// services
import { API } from "./services/Api";
import { createStore } from "./services/Store";
import { AppService } from "./services/App";

// see if there is an access token sitting
// in cookies. if so, fetch the users deets
// and construct API with token + deets
AppService.init()
  .then(config => {
    const api = new API(config);

    const auth = api.hasToken();
    const initialState = {
      auth,
      user: api.getUser(),
      route: auth ? "index" : "login",
      posts: [],
      postToEdit: "",
      appInit: false,
      hasBaseRepo: false
    };

    // init store
    let store = createStore(initialState);

    // render fn
    function renderApp() {
      render(
        <Provider api={api} store={store}>
          <App AppService={AppService}>
            <Route path="login" component={Login} />
            <AuthRoute path="index" component={Home} />
            <AuthRoute path="post" component={Form} />
            <AuthRoute path="settings" component={Settings} />
            <AuthRoute path="deploy" component={Deploy} />
          </App>
        </Provider>,
        document.getElementById("root")
      );
    }

    renderApp();
  })
  .catch(err => {
    // TODO: think of graceful error handling here
    // probably should render a spinner into #root
    // and throw any error messages there (fail whale etc.)
    console.error("There was an error initializing the app", err);
  });
