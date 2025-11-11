export const parseNdjsonData = data => {
  if (typeof data === 'object') {
    return [data];
  }

  if (typeof data !== 'string') {
    throw new Error('Unexpected nd-json data type!');
  }
  const rows = data.split(/\n|\n\r/).filter(Boolean);
  return rows.map(row => JSON.parse(row));
};

export const buildHttpRequestHeader = (
  headers = {},
  isAuth = false,
  token = '',
  contentType = 'application/json',
) => {
  headers['Content-Type'] = contentType;

  if (isAuth) {
    if (token && typeof token === 'string') {
      if (token.startsWith('Bearer ')) {
        headers.Authorization = token;
      } else {
        headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.error('Invalid token:', token);
    }
  }
  return headers;
};
