import createElement from "inferno-create-element";
import { linkEvent } from "inferno";

// handle user login
function doLogin({ api, store }) {
  api.login().then(user => {
    store.updateState({ auth: true, route: "index", user });
  });
}

// Login Screen when No-Auth
export function Login({}, { api, store }) {
  return (
    <div>
      <a
        className="ghost-btn orange"
        onClick={linkEvent({ api, store }, doLogin)}
      >
        <span>Login with GitHub <i className="fa fa-github" /></span>
      </a>
      <br />
      <input type="checkbox" id="login-cbx" />
      <label for="login-cbx">Remember Me</label>
    </div>
  );
}
