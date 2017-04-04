import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { AppService } from '../services/App';

// Login Screen when No-Auth
export function Login({ }, { api, store }) {
    return (
      <div>
        <a className="ghost-btn orange" onClick={linkEvent({ api, store }, AppService.login)}>
          <span>Login with GitHub <i className="fa fa-github"></i></span>
        </a>
        <br />
        <input type="checkbox" id="login-cbx" />
        <label for="login-cbx">Remember Me</label>
      </div>
    );
}