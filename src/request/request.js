import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';
import errorHandler from './errorHandler';
import successHandler from './successHandler';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
// let { id } = useParams()

const getToken = () => {
  let data = JSON.parse(localStorage.getItem('auth'));
  let token = data ? data.token : null;

  return token;
};


// Adding a request interceptor

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    const excludedRoutes = ['/login', '/register'];
    const isExcludedRoute = excludedRoutes.some((route) => config.url.includes(route));
    if (token && !isExcludedRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

const request = {
  create: async ({ entity, id, jsonData }) => {
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
    
      const response = await axios.patch(entity + '/update/' + id, jsonData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });

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

    try {
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);
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
  
      let url = `${entity}/list${query}`;
  
      if (entity === 'clientaddress') {
        const ClientId = localStorage.getItem('key');
        if (ClientId) {
          url = `${entity}/list/${ClientId}${query}`;
        }
      }
  
      const response = await axios.get(url);
  
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
      const response = await axios.get(`/subscriptiontype/listAll`); //axios.get(`/servicecategory/subscriptions/660250420b127c22abc78818`)
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getServiceCategory: async () => {
    try {
      const response = await axios.get(`/servicecategory/listAll`); //axios.get(`/servicecategory/subscriptions/660250420b127c22abc78818`)
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getTaxes: async () => {
    try {
      const response = await axios.get(`/taxes/show`); //axios.get(`/servicecategory/subscriptions/660250420b127c22abc78818`)
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

      return errorHandler(error);
    }
  },

  getServiceCategoryName: async (id) => {
    try {
      const response = await axios.get(`/servicelist/show/${id}`);
      return response.data;
    } catch (error) {
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

  getTax: async () => {
    try {
      const response = await axios.get('/taxes/show');
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

  getServiceListShowContract: async ({ id }) => {
    try {
      const response = await axios.get(`/servicelist/show/${id}`);
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

  getTax: async () => {
    try {
      const response = await axios.get('/taxes/show');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

   Loogout : async (navigate) => {

    try {
      const token = getToken();
      const response = await axios.post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
     navigate('/login')
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
  
};

export default request;
