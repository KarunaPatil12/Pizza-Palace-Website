import { useQuery } from '@tanstack/react-query';

import { RQ_GET_ALL_USER_API, RQ_GET_USER_BY_ID } from './constants';
import { rqCreateRequest } from './rqHttpUtils';

export const RQGetAllUsers = token => {
    console.log('rq get all users', token);
    return useQuery({
        queryKey: ['rq_get_all_users', token],
        queryFn: async () => {
            if (!token) { throw new Error('Token is required'); }
            const response = await rqCreateRequest(RQ_GET_ALL_USER_API, null, token, null);
            return response || [];
        },
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

export const RQGetUserByIDAPI = (id, token, options = {}) => {
    return useQuery({
        queryKey: ['rq_get_user_by_id', { id, token }],
        queryFn: async ({ queryKey, signal }) => {
            const { id, token } = queryKey[1];
            if (!token) { throw new Error('Invalid token: Token is required for API request'); }

            const url = RQ_GET_USER_BY_ID.url.replace('<%= id %>', id);

            // eslint-disable-next-line no-useless-catch
            try {
                const response = await rqCreateRequest(
                    { ...RQ_GET_USER_BY_ID, url },
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

