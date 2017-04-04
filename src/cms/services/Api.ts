import { GitHubAPI } from './GitHub';

interface APIInterface {
  hasToken(): boolean;
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
  hasToken(): boolean {
    return typeof this.access_token === 'string' && this.access_token !== '';
  }
}
