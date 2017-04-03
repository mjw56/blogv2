import { getTokenFromString } from './Misc';

// GitHub Service
// Currently handles all communications with GitHub API
export function GitHub({ token }) {
  const access_token = token;
  const githubBase = 'https://api.github.com';

  function request(path: string) {
    const headers = getHeaders();
    fetch(`${githubBase}${path}`, { headers })
      .then(res => res.json())
      .then(res => console.log(`deets for ${path}:`, res));
  }

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

  return {
    request,
    getHeaders
  };
}

export function githubLoginFlow(api) {
    return new Promise(function(resolve, reject) {
        function receiveMessage(event) {
            // Do we trust the sender of this message?
            if (event.origin !== window.location.origin) {
                return;
            }

            window.removeEventListener('message', receiveMessage, false);
            githubWindow.close();

            api.setToken(getTokenFromString(event.data));
            resolve();
        }
        window.addEventListener("message", receiveMessage, false);

        const githubWindow = window.open(
            `https://github.com/login/oauth/authorize?client_id=${process.env.REDACTED_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/callback`, 
            'GitHubLogin',
            'menubar=no,location=yes,resizable=yes,status=yes,width=786,height=534'
        );
    });
}

