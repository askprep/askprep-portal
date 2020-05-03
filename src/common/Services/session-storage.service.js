export default class SessionStorageService {
  static getAccessToken() {
    return this.getValue(this.ACCESS_TOKEN);
  }

  static getOAuthStatus() {
    return this.getValue(this.OAUTH_STATUS);
  }

  static setAccessToken(accessToken) {
    this.setValue(this.ACCESS_TOKEN, accessToken || '');
  }

  static setOAuthStatus(oAuthStatus) {
    this.setValue(this.OAUTH_STATUS, oAuthStatus || '');
  }

  static removeAccessToken() {
    this.removeValue(this.ACCESS_TOKEN);
  }

  static removeRefreshToken() {
    this.removeValue(this.REFRESH_TOKEN);
  }

  static removeAllItems() {
    sessionStorage.clear();
  }

  static ACCESS_TOKEN = 'access_token';
  static OAUTH_STATUS = 'OAuthStatus';

  static getValue(value) {
    return sessionStorage.getItem(value);
  }

  static setValue(key, value) {
    sessionStorage.setItem(key, value);
  }

  static removeValue(value) {
    sessionStorage.removeItem(value);
  }
}
