import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { AppService } from '../services/App';
import { Api } from '../services/Api';

// Login Screen when No-Auth
export function Login({ }, { store }) {
    return (
      <div>
        <a className="ghost-btn orange" onClick={linkEvent({ Api, store }, AppService.login)}>
          <span>Login with GitHub <i className="fa fa-github"></i></span>
        </a>
        <br />
        <input type="checkbox" id="login-cbx" />
        <label for="login-cbx">Remember Me</label>
      </div>
    );
}