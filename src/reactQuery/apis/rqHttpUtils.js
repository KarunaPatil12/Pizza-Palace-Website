import axios from 'axios';
import {isEmpty, template} from 'lodash';

import AppConfig from '../../configs/AppConfig';
import {buildHttpRequestHeader} from '../../utils';

export const rqCreateMultipartRequest = (api, body, token, params, signal) => {
  return rqCreateRequest(
    api,
    body,
    token,
    params,
    signal,
    'multipart/form-data',
  );
};

export const rqCreateRequest = (
  api,
  body,
  token,
  params,
  signal,
  contentType = 'application/json',
  accept = 'application/json',
  filter = {},
) => {
  let url = api.url;
  if (params !== null && params !== undefined) {
    url = template(url)(params);
  }
  if (isEmpty(token)) {
    token = '';
  }

  const headers = buildHttpRequestHeader({}, api.auth, token, contentType);

  if (api.search && Object.keys(filter).length > 0) {
    const queryString = new URLSearchParams(filter).toString();
    url = `${url}?${queryString}`;
  }

  if (api.method === 'POST') {
    return axios
      .post(`${AppConfig.API_BASE_URL}/${url}`, body, {
        headers: headers,
        signal,
      })
      .then(response => response.data);
  } else if (api.method === 'PUT') {
    return axios
      .put(`${AppConfig.API_BASE_URL}/${url}`, body, {
        headers: headers,
        signal,
      })
      .then(response => response.data);
  } else {
    return axios({
      url:` ${AppConfig.API_BASE_URL}/${url}`,
      method: api.method,
      headers: headers,
      signal,
    }).then(response => response.data);
  }
};