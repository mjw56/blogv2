import { getTokenFromString } from './Misc';

// GitHub Service
// Currently handles all communications with GitHub API
export function GitHub({ token }) {
  const access_token = token;
  const githubBase = 'https://api.github.com';
  let user = {};

  // make a request to github api for a given path
  function request(path: string) {
    return new Promise(function(resolve, reject) {
      const headers = getHeaders();
      fetch(`${githubBase}${path}`, { headers })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  // create headers needed for github api calls
  function getHeaders(headers?: any) {
    const options = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (access_token) {
      return {
        ...options,
        Authorization: `token ${ access_token }`,
      };
    }

    return options;
  }

  return new Promise(function(resolve, reject) {
    if (!access_token) {
      reject();
    }

    // need to set user deets
    // for subsequential calls
    request('/user')
      .then(res => { 
        user = res; // set the user deets

        // return service and deets
        resolve({
          github: {
            request,
            getHeaders
          },
          user,
        }); 
      })
      .catch(err => reject(err));
  });
}

// handle opening new window for github oauth login
// and hearing message back from that window with the 
// github access_token. the popup is responsible
// for the token handshake through the callback param
// provided which directs to the server and then responds
// with the access_token which is relayed back to parent window 
export function githubLoginFlow(api, rememberMe) {
    return new Promise(function(resolve, reject) {
        // handle messages received from popup window
        function receiveMessage(event) {
            // Do we trust the sender of this message?
            if (event.origin !== window.location.origin) {
                return;
            }

            // remove the listener as we should only receive one message
            window.removeEventListener('message', receiveMessage, false);
            // close the window
            githubWindow.close();

            // set token and get user deets once, resolve these deets back to caller
            api.setToken(getTokenFromString(event.data), rememberMe)
              .then(user => resolve(user))
              .catch(err => reject());
        }
        // listen for messages back from popup
        window.addEventListener("message", receiveMessage, false);

        // open the popup
        const githubWindow = window.open(
            `https://github.com/login/oauth/authorize?client_id=${process.env.REDACTED_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/callback`, 
            'GitHubLogin',
            'menubar=no,location=yes,resizable=yes,status=yes,width=786,height=534'
        );
    });
}

