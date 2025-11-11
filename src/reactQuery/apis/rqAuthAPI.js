import { useMutation } from '@tanstack/react-query';
import { RQ_GET_PROFILE_API, RQ_UPDATE_Admin_PROFILE_API, RQ_UPDATE_User_PROFILE_API, RQ_USER_LOGIN_API, RQ_USER_REGISTRATION_API } from './constants';
import { rqCreateRequest } from './rqHttpUtils';
import { useQuery } from '@tanstack/react-query';

export const RQUserLoginAPI = (options = {}) => {
    console.log('RQ_USER_LOGIN_API', RQ_USER_LOGIN_API)

    return useMutation({
        mutationKey: ['rq_login_user'],
        mutationFn: async formData => {
            if (!formData) { throw new Error('formData is undefined'); }
            return rqCreateRequest(RQ_USER_LOGIN_API, formData);
        },
        ...options,
    });
};

export const RQUserRegistrationAPI = (options = {}) => {
    return useMutation({
        mutationKey: ['rq_register_user'],
        mutationFn: async formData => {
            if (!formData) { throw new Error('formData is undefined'); }
            return rqCreateRequest(RQ_USER_REGISTRATION_API, formData);
        },
        ...options,
    });
};

export const RQGetProfileAPI = (id, token, options = {}) => {
    return useQuery({
        queryKey: ['rq_get_admin_profile', { id, token }],
        queryFn: async ({ queryKey, signal }) => {
            const { id, token } = queryKey[1];
            if (!token) { throw new Error('Invalid token: Token is required for API request'); }

            const url = RQ_GET_PROFILE_API.url.replace('<%= id %>', id);

            // eslint-disable-next-line no-useless-catch
            try {
                const response = await rqCreateRequest(
                    { ...RQ_GET_PROFILE_API, url },
                    null,
                    token,
                    null,
                    signal,
                );

                return response;
            } catch (error) {
                throw error;
            }
        },
        ...options,
    });
};

export const RQUpdateAdminProfileAPI = (options = {}) => {
    return useMutation({
        mutationKey: ['rq_update_profile'],
        mutationFn: async ({ token, formData, id }) => {
            const url = RQ_UPDATE_Admin_PROFILE_API.url.replace('<%= id %>', id);
            return rqCreateRequest(
                { ...RQ_UPDATE_Admin_PROFILE_API, url },
                formData,
                token,
                null,
            );
        },
        ...options,
    });
};

export const RQUpdateUserProfileAPI = (options = {}) => {
    return useMutation({
        mutationKey: ['rq_update_profile'],
        mutationFn: async ({ token, formData, id }) => {
            const url = RQ_UPDATE_User_PROFILE_API.url.replace('<%= id %>', id);
            return rqCreateRequest(
                { ...RQ_UPDATE_User_PROFILE_API, url },
                formData,
                token,
                null,
            );
        },
        ...options,
    });
};
