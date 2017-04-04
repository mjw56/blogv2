import { createCookie, readCookie, eraseCookie } from './Cookies';
import { GitHub } from './GitHub';

// Currently handling Client-Side Auth
export function API() {
  return new Promise(function(resolve, reject) {
    const COOKIE_KEY: string = 'redacted';
    let access_token: string = readCookie(COOKIE_KEY);
    let githubAPI;
    
    // check if token is present
    function hasToken(): boolean {
      return typeof access_token === 'string' && access_token !== '';
    }

    // set the token and instantiate github api
    function setToken(token: string, rememberMe?: boolean): Promise<any> {
      return new Promise(function(resolve, reject) {
        access_token = token;
        if (rememberMe) {
          createCookie(COOKIE_KEY, access_token);
        }

        // init the github service and
        // grab the user deets for later
        GitHub({ token: access_token })
          .then((res: { github: any, user: any }) => {
            githubAPI = res.github;

            // return the user deets
            resolve(res.user);
          })
          .catch(err => reject(err));
      });
    }

    // get the access token
    function getToken(): string {
      return access_token;
    }

    // erase token locally and from cookies
    function eraseToken() {
      access_token = null;
      eraseCookie(COOKIE_KEY);
    }

    // call github api with a path
    function callGitHub(path: string): Promise<any> {
      return githubAPI.request(path);
    }

    let api = {
      hasToken,
      setToken,
      getToken,
      eraseToken,
      callGitHub,
    };

    // check if access token is present first time
    if (access_token) {
      // on init, if we have token
      // from cookie, boot up github api
      GitHub({ token: access_token })
        .then((res: { github: any, user: any }) => {
          githubAPI = res.github;
          resolve({
           api,
           user: res.user
          })
        })
        .catch(err => reject(err));
    } else {
      // otherwise just return the api
      resolve({ api });
    }
  });
}