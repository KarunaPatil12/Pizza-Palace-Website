export const RQ_USER_LOGIN_API = {
    url: 'user/Login',
    method: 'POST',
};

export const RQ_USER_REGISTRATION_API = {
    url: 'user/register',
    method: 'POST',
    auth: false,
};
export const RQ_UPDATE_Admin_PROFILE_API = {
    url: 'user/updateUser/<%= id %>',
    method: 'PUT',
    auth: true,
};

export const RQ_UPDATE_User_PROFILE_API = {
    url: 'user/updateUser/<%= id %>',
    method: 'PUT',
    auth: true,
};
export const RQ_GET_PROFILE_API = {
    url: 'user/<%= id %>',
    method: 'GET',
    auth: true,
};

