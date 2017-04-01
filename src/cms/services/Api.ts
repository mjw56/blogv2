import { createCookie, readCookie } from './Cookies';
import { GitHub } from './GitHub';

function API() {
  let cookie_key: string = 'redacted';
  let access_token: string = readCookie(cookie_key);
  let githubAPI;

  if (access_token) {
    githubAPI = GitHub({ token: access_token });
  }

  function hasToken() {
    return typeof access_token === 'string' && access_token !== '';
  }

  function setToken(token: string) {
    access_token = token;
    createCookie(cookie_key, access_token);
    githubAPI = GitHub({ token: access_token });
  }

  function getToken() {
    return access_token;
  }

  function callGitHub(path: string) {
    githubAPI.request(path);
  }

  return {
    hasToken,
    setToken,
    getToken,
    callGitHub,
  };
}

export const Api = API();