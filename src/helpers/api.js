import config from '../config/production';
import { AsyncStorage } from 'react-native';
import url from 'url';

async function resolveUrl({ path, query = {} }) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const urlString = url.resolve(config.apiBaseUrl, path);
  const urlObj = url.parse(urlString, true);

  urlObj.query = {
    ...urlObj.query,
    accessToken,
    ...query,
  };

  return urlObj;
}

export default async function api(options = {}) {
  const { path, method = 'GET', query, data } = options;
  const urlObj = await resolveUrl({ path, query });

  return fetch(url.format(urlObj), {
    method,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
