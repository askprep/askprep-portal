import decode from 'jwt-decode';

export default class JwtTokenService {
  static isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

  static getDecodedToken(encodedToken) {
    return decode(encodedToken);
  }

  static getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }
}
