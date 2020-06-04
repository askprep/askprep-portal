import { HttpNodeService } from '../HttpService';

/**
 * API for fetch user
 */
export async function getUserRoleandPermission() {
  try {
    const endpoint = `user`;
    return await HttpNodeService.get(endpoint).then(function(res) {
      return res.data;
    });
  } catch (error) {
    return {};
  }
}
