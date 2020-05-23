import { AuthorizationRepository } from '../../common/Repositories/authorizationRepository';
import Axios_Setup from './globalFetch';
import SessionStorageService from '../../common/Services/session-storage.service';

const queryString = require('query-string');

const callBackUrl = window.location.origin;
const AUTHORIZE_URL = window.GITHUB_CALLBACK_URL
  ? window.GITHUB_CALLBACK_URL
  : 'http://localhost:7070/api/user/authViaGitHub';
const CLIENT_ID = window.CLIENT_ID ? window.CLIENT_ID : 'urn:gatt-tools:devqa';
const REDIRECT_URL = window.REDIRECT_URL
  ? window.REDIRECT_URL
  : 'http://localhost:3000';

// This Class includes Methods for redirecting user to IDAM.
export default class IDAM {
  _authorizeUrl;
  _authorizationRepository;

  constructor() {
    // Does this need to be randomly generated everyone time?
    const state = '064797aa-e584-4732-8fd2-0e79617b39e4';

    this._authorizeUrl = `${AUTHORIZE_URL}`;
    // +`response_type=${encodeURIComponent("code")}` +
    // `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    // `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    // `&state=${state}` +
    // `&scope=${encodeURIComponent("profile openid email")}` +
    // `&nonce=123`; // This is required for ForgeRock OpenAM Implicit Flow

    this._authorizationRepository = new AuthorizationRepository();
  }

  parseCodeFromUri() {
    const parsedUri = queryString.parse(window.location.search);
    return parsedUri.code;
  }

  // Responsible for
  // 1. Moving the User to the Correct URI where Token Can Be Extracted
  IdamRedirectionLogic(renewExpiredToken) {
    if (renewExpiredToken) {
      SessionStorageService.setOAuthStatus('Redirecting');
    }

    // This flag is needed so that I can Enter in the loop
    const authStatus = SessionStorageService.getOAuthStatus();
    const Redirect = authStatus === null || authStatus === 'Redirecting';

    if (Redirect) {
      // Then I need to go to IDAM to get a JWT
      SessionStorageService.setOAuthStatus('Redirecting');
      // Navigate to the Authorization URL
      window.location.href = this._authorizeUrl;
    }
  }

  IdamDeserialization() {
    SessionStorageService.setOAuthStatus('RedirectingBack');

    // Get code
    const code = this.parseCodeFromUri();

    return this._authorizationRepository
      .getTokensFromAuthCode(code)
      .then((res) => {
        try {
          if (res.statusText === 'OK') {
            res.json().then((payload) => {
              const accessToken = payload.jwt_token ? payload.jwt_token : '';
              // Set tokens in session storage
              SessionStorageService.setAccessToken(accessToken);
              this.IdamCleanUp();
              window.location.href = callBackUrl;
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
  }

  IdamCleanUp() {
    SessionStorageService.setOAuthStatus('Done');
    this.Finish();
  }

  /**
   * This method is responsible for setting axios properly
   */
  Finish() {
    let HTTP_Obj = new Axios_Setup();
    HTTP_Obj.AxiosInterceptor();
  }
}
