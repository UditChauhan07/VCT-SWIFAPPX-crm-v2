import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from './errorHandler';
import successHandler from './successHandler';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
// let { id } = useParams();

const request = {
  create: async ({ entity, id, jsonData }) => {
    // console.log('dsds', jsonData);
    try {
      let url = entity + '/create';
      if (entity === 'clientaddress' && id) {
        url = `${entity}/create/${id}`;
      }

      const response = await axios.post(url, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  createAndUpload: async ({ entity, jsonData }) => {
    try {
      const response = await axios.post(entity + '/create', jsonData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }) => {
    try {
      // console.log('data entities --- ', {entity, id});
      const response = await axios.get(entity + '/read/' + id);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ entity, id, jsonData }) => {
    try {
      const response = await axios.patch(entity + '/update/' + id, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  updateAndUpload: async ({ entity, id, jsonData }) => {
    try {
      // console.log({ entity, id, jsonData });
      const response = await axios.patch(entity + '/update/' + id, jsonData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      // console.log({response});
      // return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  delete: async ({ entity, id }) => {
    try {
      const response = await axios.delete(entity + '/delete/' + id);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  filter: async ({ entity, options = {} }) => {
    try {
      let filter = options.filter ? 'filter=' + options.filter : '';
      let equal = options.equal ? '&equal=' + options.equal : '';
      let query = `?${filter}${equal}`;

      const response = await axios.get(entity + '/filter' + query);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  search: async ({ entity, value, options = {} }) => {
    console.log(value);
    try {
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);
      // headersInstance.cancelToken = source.token;
      const response = await axios.get(entity + '/search' + query);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ entity, options = {} }) => {
    try {
      let query = '?';

      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }

      query = query.slice(0, -1);

      let url = entity + '/list' + query;

      if (entity === 'clientaddress') {
        // const [ClientId, setClientId] = useState( localStorage.getItem('key'))
        const ClientId = localStorage.getItem('key');
        url = entity + '/list/' + ClientId + query;
      }

      const response = await axios.get(url);

      // const response = await axios.get(entity + '/list'  + query);
      // console.log({response});
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  Addresslist: async ({ entity, id, options = {} }) => {
    try {
      let query = '?';

      if (entity === 'address') {
        query = '?';
      }

      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }

      query = query.slice(0, -1);

      const response = await axios.get(entity + 'address/list' + `/${id}` + query);
      // console.log({response});
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  listAll: async ({ entity }) => {
    try {
      const response = await axios.get(entity + '/listAll');

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  post: async ({ entity, jsonData }) => {
    try {
      const response = await axios.post(entity, jsonData);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ entity }) => {
    try {
      const response = await axios.get(entity);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const response = await axios.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  upload: async ({ entity, id, jsonData }) => {
    try {
      const response = await axios.patch(entity + '/upload/' + id, jsonData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
  summary: async ({ entity }) => {
    try {
      const response = await axios.get(entity + '/summary');

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  mail: async ({ entity, jsonData }) => {
    try {
      const response = await axios.post(entity + '/mail/', jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  convert: async ({ entity, id }) => {
    try {
      const response = await axios.get(`${entity}/convert/${id}`);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getRoles: async () => {
    try {
      const response = await axios.get(`/roles/show`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getCategorySubscription: async () => {
    try {
      const response = await axios.get(`/subscriptiontype/listAll`); //axios.get(`/servicecategory/subscriptions/660250420b127c22abc78818`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getServiceCategory: async () => {
    try {
      const response = await axios.get(`/servicecategory/listAll`); //axios.get(`/servicecategory/subscriptions/660250420b127c22abc78818`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getCateGorySubscription: async ({ id }) => {
    try {
      const response = await axios.get(`/servicecategory/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getCateGoryDetails: async ({ id }) => {
    try {
      const response = await axios.get(`/servicecategory/read/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  create2: async ({ entity, jsonData }) => {
    console.log('dsds', jsonData);
    try {
      const response = await axios.post(entity + '/create', jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getSearchClientAddress: async (id) => {
    try {
      const response = await axios.get(`/clientaddress/search?q=ho&client=${id}&fields=label`);
      return response.data;
    } catch (error) {
      console.log({ lll: error });
      return errorHandler(error);
    }
  },

  getServiceCategoryName: async (id) => {
    try {
      const response = await axios.get(`/servicelist/show/${id}`);
      return response.data;
    } catch (error) {
      console.log({ lll: error });
      return errorHandler(error);
    }
  },
  getSalesPerson: async () => {
    try {
      const response = await axios.get('/admin/listAll');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getLeadWorker: async () => {
    try {
      const response = await axios.get('/worker/listAll');
      console.log(response);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getServiceCategoryOptions: async () => {
    try {
      const response = await axios.get('/servicecategory/listAll');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getProductList: async () => {
    try {
      const response = await axios.get('/productcategory/listAll');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getServiceListShow: async ({ id }) => {
    try {
      const response = await axios.get(`/servicelist/service/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getServiceListShows: async ({ id }) => {
    try {
      const response = await axios.get(`/servicelist/show/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getSubscriptiononetime: async () => {
    try {
      const response = await axios.get(`/subscriptiontype/oneTime`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },



};


export default request;
