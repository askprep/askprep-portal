import { isNil } from 'lodash';
import OAUTH from './helpers/oauth';
import { getUserRoleandPermission } from '../common/Repositories/manageUsersRepository';
import SessionStorageService from '../common/Services/session-storage.service';
import JwtTokenService from '../common/Services/jwt-token.service';
import { setUserdetails } from '../redux/Actions/userManagement/ReduxActions';

const LOGOUT_URL = window.LOGOUT_URL ? window.LOGOUT_URL : '';

export class Auth {
  static _userRolePermission;
  static authenticate() {
    var oauth = new OAUTH();
    oauth.IdamRedirectionLogic(false);
  }

  static GetuserDetails() {
    return this._userRolePermission;
  }

  static async CallUserRoleApi() {
    let userDetails = await getUserRoleandPermission();
    setUserdetails(userDetails);
    this._userRolePermission = userDetails;
    return userDetails;
  }

  static login() {
    const oauth = new OAUTH();
    // First lets check session storage for the token
    const oauthStatus = SessionStorageService.getOAuthStatus();
    if (oauthStatus === 'Redirecting') {
      oauth.IdamDeserialization().then((r) => {});
    } else if (oauthStatus === 'RedirectingBack') {
      oauth.IdamCleanUp();
      this.CallUserRoleApi().then((res) => {});
    }
    // The follow line checks if the user already has a token but it's expired. If so, we need to use the refresh token to get new tokens (id_token/access_token)
    else if (oauthStatus === 'Done' && this.isAuthenticated()) {
      this.CallUserRoleApi().then((res) => {});
    } else {
      this.authenticate();
    }
  }

  static isAuthenticated() {
    const idToken = SessionStorageService.getAccessToken();
    return idToken ? true : false;
    // If there is no idToken then the user isn't authenticated
  }

  // Calling this method will make a call to user api. Please avoid using this
  /*   static async IsQRAdmin() {
    const response = await getUserRoleandPermission();
    if (response && response.roles) {
      const isQRAdmin = response.roles.find(
        (element: any) => element.name === "QR Admin"
      );
      return !!isQRAdmin;
    }

    return false;
  } */

  static signOut() {
    SessionStorageService.removeAccessToken();
    window.location = LOGOUT_URL;
  }

  static getUserName() {
    const encodedToken = SessionStorageService.getIdToken();

    if (isNil(encodedToken)) {
      return null;
    }

    const token = JwtTokenService.getDecodedToken(encodedToken);

    if (isNil(token)) {
      return null;
    }

    // Unique name not present in the token
    return token.given_name + ' ' + token.family_name;
  }

  static getUserGuid() {
    const encodedToken = SessionStorageService.getIdToken();

    if (isNil(encodedToken)) {
      return null;
    }

    const token = JwtTokenService.getDecodedToken(encodedToken);

    if (isNil(token)) {
      return null;
    }

    const userGuid = token.sub;
    return userGuid;
  }

  static getUserInitials() {
    const encodedToken = SessionStorageService.getIdToken();

    if (isNil(encodedToken)) {
      return null;
    }

    const token = JwtTokenService.getDecodedToken(encodedToken);

    if (isNil(token)) {
      return null;
    }

    const firstInitials = token.given_name;
    const lastInitials = token.family_name;

    if (
      firstInitials &&
      firstInitials.length > 0 &&
      lastInitials &&
      lastInitials.length > 0
    ) {
      return (
        firstInitials.toUpperCase().substring(0, 1) +
        lastInitials.toUpperCase().substring(0, 1)
      );
    }

    return '';
  }

  static getUserEmail() {
    const encodedToken = SessionStorageService.getIdToken();

    if (isNil(encodedToken)) {
      return null;
    }

    const token = JwtTokenService.getDecodedToken(encodedToken);

    if (isNil(token)) {
      return null;
    }

    return token.email;
  }

  static setAxoisDefaults() {
    let oauth = new OAUTH();
    oauth.Finish();
  }

  // static getNewTokens() {
  //   const refreshToken = SessionStorageService.getRefreshToken() || '';
  //   return new AuthorizationRepository()
  //     .getTokensFromRefreshToken(refreshToken)
  //     .then((res) => {
  //       if (res.statusText === 'OK') {
  //         res.json().then((payload) => {
  //           const accessToken = payload ? payload.access_token : '';
  //           const idToken = payload ? payload.id_token : '';

  //           // Set tokens in session storage
  //           SessionStorageService.setAccessToken(accessToken);
  //           SessionStorageService.setIdToken(idToken);

  //           // Set Axios
  //           this.setAxoisDefaults();
  //         });
  //       }
  //     });
  // }
}
