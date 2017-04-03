import { createCookie, readCookie } from './Cookies';
import { GitHub } from './GitHub';

// Currently handling Client-Side Auth
function API() {
  let cookie_key: string = 'redacted';
  let access_token: string = readCookie(cookie_key);
  let githubAPI = access_token ? GitHub({ token: access_token }) : null;

  function hasToken(): boolean {
    return typeof access_token === 'string' && access_token !== '';
  }

  function setToken(token: string, rememberMe?: boolean): void {
    access_token = token;
    if (rememberMe) {
      createCookie(cookie_key, access_token);
    }
    githubAPI = GitHub({ token: access_token });
  }

  function getToken(): string {
    return access_token;
  }

  function callGitHub(path: string): Promise<any> {
    return githubAPI.request(path);
  }

  return {
    hasToken,
    setToken,
    getToken,
    callGitHub,
  };
}

export const Api = API();