import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Header } from './Header';
import { Home } from './Home';
import Form from './Form';
import { Api } from '../services/Api';
import { FormService } from '../services/Form';

// Main App Shell
export function App({ AppService, children }, { store }) {
    const { auth, route } = store.getState();
    return (
        <section id="container">
            <Header auth={auth} />
            <section class={`content ${route}`}>
                { children }
            </section>
        </section>
    );
}