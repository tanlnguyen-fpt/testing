import axios from 'axios';
import Utils from './Utils';
const { isEmpty } = Utils;

const apiBaseUrl = 'http://localhost:3000';

const getClient = (baseUrl = apiBaseUrl) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  client.interceptors.response.use(
    (response) => {
      const { status, data: rawData } = response;
      let data, meta;
      if (isEmpty(rawData)) {
        data = {};
        meta = {};
      } else {
        data = rawData.data;
        meta = rawData.meta;
      }
      return { status, data, meta } as any;
    },
    (error) => {
      const { status, data: rawData } = error.response;
      let data, meta;

      if (isEmpty(rawData)) {
        data = {};
        meta = {};
      } else {
        data = rawData.data;
        meta = rawData.meta;
      }
      return Promise.reject({ status, data, meta, message: error.message });
    },
  );
  return client;
};
class ApiClient {
  client: any = {};
  constructor(baseUrl = apiBaseUrl) {
    this.client = getClient(baseUrl);
  }
  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  getAsAnonymous(url, conf = {}) {
    return this.client
      .get(url, { ...conf, anonymousRequest: true })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}
const defaultClient = new ApiClient();

export default defaultClient;

export { ApiClient };
