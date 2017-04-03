import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { AppService } from '../services/App';
import { Api } from '../services/Api';

// Login Screen when No-Auth
export function Login({ }, { store }) {
    return (
      <div>
        <button onClick={linkEvent({ Api, store }, AppService.login)}>Login with GitHub</button>
        <input type="checkbox" id="login-cbx" />
        <label for="login-cbx">Remember Me</label>
      </div>
    );
}