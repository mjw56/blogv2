import { linkEvent, render } from 'inferno';
import createElement from 'inferno-create-element';

// components
import { Provider } from './components/Provider';
import { Route } from './components/Route';
import { AuthRoute } from './components/AuthRoute';
import { App } from './components/App';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Form } from './components/Form';

// services
import { Api } from './services/Api';
import { createStore } from './services/Store';
import { AppService } from './services/App';
import { RouterService } from './services/Router';

const hasToken = Api.hasToken();
const initialState = {
    route: hasToken ? 'index' : 'login',
    posts: [],
    auth: hasToken,
    user: {}
};

// init store
let store = createStore(initialState, renderApp);

// init router
const router = RouterService(store);

// render fn
function renderApp() {
    render(
        <Provider store={store} router={router}>
            <App AppService={AppService}>
                <Route path="login" component={Login} />
                <AuthRoute path="index" component={Home} />
                <AuthRoute path="new-post" component={Form} />
            </App>
        </Provider>,
        document.getElementById("root")
    );
}

renderApp();
