import { GitHubAPI } from "./GitHub";

interface APIInterface {
  hasToken(): boolean,
  getToken(): string
  post(route: string, data: Object): Promise<any>;
}

/**
 * Main API Gateway for handling of
 * auth, github communication
 */
export class API extends GitHubAPI implements APIInterface {
  access_token;
  user;

  constructor(config) {
    super(config);
    this.access_token = config.access_token;
    this.user = config.user;
  }

  // check if token is present
  hasToken() {
    return typeof this.access_token === "string" && this.access_token !== "";
  }

  getToken() {
    return this.access_token;
  }

  post(route, data) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch(route, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      }).then(res => {
        if (res && res.status === 200) {
          resolve();
        } else {
          reject("POST CONTENT SAVE FAILURE");
        }
      });
    });
  }
}
