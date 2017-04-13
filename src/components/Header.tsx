import createElement from 'inferno-create-element';
import { HeaderAuth } from './Header.Auth';
import { HeaderNonAuth } from './Header.NonAuth';

// Generic App Header
// TODO: handle auth/no-auth
export const Header = ({ auth }, { store }) => (
    <header className="header black-bg">
        <a className="circle"></a>
        { auth ? <HeaderAuth avatar={store.getState().user.avatar_url}/> : <HeaderNonAuth /> }
    </header>
);