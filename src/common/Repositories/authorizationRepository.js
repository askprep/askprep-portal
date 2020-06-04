const API_HOST = window.API_HOST;

const OPENAM_LOGOUT_URL = window.LOGOUT_URL
  ? window.LOGOUT_URL
  : 'https://login-stg.pwc.com/openam/oauth2/connect/endSession';
const AUTHORIZE_URL = window.AUTHORIZE_URL
  ? window.AUTHORIZE_URL
  : 'https://github.com/login/oauth/authorize';

export class AuthorizationRepository {
  async getTokensFromAuthCode(authCode) {
    const url = `${API_HOST}api/user/authorization`;
    const init = {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authCode }),
    };

    return await fetch(url, init);
  }

  async getTokensFromRefreshToken(refreshToken) {
    const url = `${API_HOST}api/authorization/token`;
    const init = {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refreshToken),
    };

    return await fetch(url, init);
  }

  async logout(token) {
    const url = `${OPENAM_LOGOUT_URL}?id_token_hint=${token}`;
    const init = {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch(url, init);
  }
}
