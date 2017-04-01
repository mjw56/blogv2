import { linkEvent, render } from 'inferno';
import createElement from 'inferno-create-element';
import { Api } from './services/Api';
import { createStore } from './services/Store';
import { Provider } from './components/Provider';
import { App } from './components/App';
import { AppService } from './services/App';

const initialState = {
    panel: 'index',
    posts: [],
    auth: false
};

let store = createStore(initialState, renderApp);

// onComponentDidMount
function mounted() {
    let auth;
    if (Api.hasToken()) {
        auth = true;

        // setup page for the user
        AppService.getPosts(store);
    } else {
        auth = false;
    }

    store.updateState({ auth });
}

// wrapper for inferno render
function renderApp() {
    render(
        <Provider store={store}>
            <App
                onComponentDidMount={mounted}
                AppService={AppService}
            />
        </Provider>,
        document.getElementById("root")
    );
}

renderApp();
