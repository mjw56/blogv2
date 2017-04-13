import { createCookie, readCookie, eraseCookie } from "./Cookies";
import { getTokenFromString } from "./Misc";

interface GitHubAPIInterface {
  setToken(token: string, rememberMe?: boolean): Promise<Object>,
  eraseToken(): void,
  getUser(): Object,
  getRepo(repo: string): Promise<Object>,
  forkRepo(Object: { owner: string, repo: string }): Promise<Object>,
  setUser(): Promise<Object>,
  getHeaders(input: { headers?: Object }): Object,
  request(path: string, options?: Object): Promise<Object>,
  login(rememberMe: boolean): Promise<Object>
}

/**
 * GitHub API base class is responsible for
 * login, set/get of auth tokens, and all 
 * communication with the official GitHub API 
 * endpoint, _the MainAPI extends this class_
 */
export class GitHubAPI implements GitHubAPIInterface {
  COOKIE_KEY = "redacted";
  access_token;
  user;
  base_url;

  constructor(config) {
    this.access_token = config.access_token;
    this.user = config.user;
    this.base_url = "https://api.github.com";
  }

  // set the token and instantiate github api
  setToken(token: string, rememberMe?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.access_token = token;
      if (rememberMe) {
        createCookie(this.COOKIE_KEY, this.access_token);
      }

      this.setUser().then(user => resolve(user)).catch(err => reject(err));
    });
  }

  // erase token locally and from cookies
  eraseToken() {
    this.access_token = null;
    eraseCookie(this.COOKIE_KEY);
  }

  getUser() {
    return this.user;
  }

  // get repo contents, or just check for existence
  getRepo(repo: string) {
    return this.request(`/repos/:username/${repo}`);
  }

  // fork a repo
  forkRepo({ owner, repo }) {
    return this.request(`/repos/${owner}/${repo}/forks`, { method: "POST" });
  }

  setUser() {
    return this.request("/user")
      .then(user => {
        this.user = user;
        return user;
      })
      .catch(err => err);
  }

  getHeaders({ headers = {} }) {
    const options = {
      "Content-Type": "application/json",
      ...headers
    };

    if (this.access_token) {
      return {
        ...options,
        Authorization: `token ${this.access_token}`
      };
    }

    return options;
  }

  request(path: string = "", options = {}) {
    const assembledPath = this.user
      ? path.replace(":username", this.user.login)
      : path;

    return new Promise((resolve, reject) => {
      const headers = this.getHeaders({});
      fetch(`${this.base_url}${assembledPath}`, { headers, ...options })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  // handle opening new window for github oauth login
  // and hearing message back from that window with the
  // github access_token. the popup is responsible
  // for the token handshake through the callback param
  // provided which directs to the server and then responds
  // with the access_token which is relayed back to parent window
  login() {
    return new Promise((resolve, reject) => {
      // handle messages received from popup window
      const receiveMessage = event => {
        // Do we trust the sender of this message?
        if (event.origin !== window.location.origin) {
          return;
        }

        // remove the listener as we should only receive one message
        window.removeEventListener("message", receiveMessage, false);

        // close the window
        githubWindow.close();

        // set token and get user deets once, resolve these deets back to caller
        this.setToken(
          getTokenFromString(event.data),
          !!document.querySelector("#login-cbx:checked")
        )
          .then(user => resolve(user))
          .catch(err => reject());
      };

      // listen for messages back from popup
      window.addEventListener("message", receiveMessage, false);

      // open the popup
      const githubWindow = window.open(
        `https://github.com/login/oauth/authorize?client_id=${process.env.REDACTED_GITHUB_CLIENT_ID}&scope=user%20public_repo&redirect_uri=http://localhost:3000/callback`,
        "GitHubLogin",
        "menubar=no,location=yes,resizable=yes,status=yes,width=786,height=534"
      );
    });
  }
}
