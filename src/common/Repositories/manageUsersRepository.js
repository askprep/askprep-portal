import HttpService from '../HttpService';
// import {
//   getUsersSuccessfully,
//   getUsersFailed,
//   getUserRolesFailed,
//   getUserRolesSuccessfully,
//   savedUserRoleSuccessfully,
//   savedUserRoleFailed,
//   saveUsersForTaskAssignment,
// } from 'src/Redux/User Management/Actions';

/**
 * API for fetching the list of users
 */
export const fetchUsers = async () => {
  try {
    const endPoint = 'users';
    const response = await HttpService.get(endPoint);
    return response;
  } catch (err) {
    console.error(err);
    return { status: 500, data: [], error: err };
  }
};
/**
 * API for deleting a user
 * @param userId
 */
export const deleteUser = async (userId, reviewType, userRole) => {
  try {
    const endPoint = `users/${userId}?reviewType=${reviewType}&userRole=${userRole}`;
    const response = await HttpService.delete(endPoint);
    return response;
  } catch (err) {
    console.error(err);
    return { status: 500, data: [], error: err };
  }
};
/**
 * Api to fetch user details
 * @param userId
 */
export const getUserDetails = async (userId) => {
  try {
    const endPoint = `user/${userId}`;
    const response = await HttpService.get(endPoint);
    return response;
  } catch (err) {
    console.error(err);
    return { status: 500, data: [], error: err };
  }
};
// export const getUsersPeopleSearch = (searchedUser) => {
//   return async (dispatch) => {
//     try {
//       const endpoint = `pmdm?name=${searchedUser}`;
//       const res = await HttpService.get(endpoint);
//       dispatch(getUsersSuccessfully(res.data));
//     } catch (error) {
//       dispatch(getUsersFailed(error.message));
//     }
//   };
// };

export const genericPeopleSearch = async (searchedUser) => {
  try {
    const endpoint = `pmdm?name=${searchedUser}`;
    const res = await HttpService.get(endpoint);
    let formattedUsers = [];
    res.data.map((item) => {
      formattedUsers.push({
        label: item.firstName + ' ' + item.lastName,
        value: item,
      });
    });
    return formattedUsers;
  } catch (error) {
    return error;
  }
};

// export const getUserRoles = () => {
//   return async (dispatch) => {
//     try {
//       const endpoint = `role`;
//       const res = await HttpService.get(endpoint);
//       dispatch(getUserRolesSuccessfully(res.data));
//     } catch (error) {
//       dispatch(getUserRolesFailed(error.message));
//     }
//   };
// };

export async function getUserRoleandPermission() {
  try {
    const endpoint = `user`;
    return await HttpService.get(endpoint).then(function(res) {
      return res.data;
    });
  } catch (error) {
    return {};
  }
}
export async function getUserRoleandPermissionByDispatch() {
  try {
    const endpoint = `user`;
    let res = await HttpService.get(endpoint);
    return res.data;
  } catch (error) {
    return {};
  }
}
// export function saveUserRoles(body) {
//   return async (dispatch) => {
//     try {
//       const endpoint = `users`;
//       let res = await HttpService.post(endpoint, body);
//       dispatch(savedUserRoleSuccessfully(res.data));
//     } catch (error) {
//       dispatch(savedUserRoleFailed({}));
//     }
//   };
// }

// export const getUserForFocusAreaTaskAssignment = (reviewType) => {
//   return async (dispatch) => {
//     try {
//       const endPoint = `ecrUsers/${reviewType}`;
//       let res = await HttpService.get(endPoint);
//       dispatch(saveUsersForTaskAssignment(res.data));
//     } catch (err) {
//       dispatch(saveUsersForTaskAssignment({}));
//     }
//   };
// };

export async function validateETUser(obj, reviewPlanningId) {
  try {
    const endpoint = `addETUserValidation?reviewPlanningId=${reviewPlanningId}`;
    let res = await HttpService.post(endpoint, obj);
    return res.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}
