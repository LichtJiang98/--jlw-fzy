import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // 添加请求拦截器
  request.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {

      return Promise.reject(error);
    }
  );
  
  // 添加响应拦截器
  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export const getMoreData = (pageNum, pageSize) => {
    return request({
      url: '/api/data',
      method: 'get',
      params: {
        page: pageNum,
        size: pageSize,
      },
    });
  };

  export const getSelectData = (choice, count) => {
    return request({
      url: `/api/selectdata/${choice}`,
      method: 'get',
      params: {
        size: count,
      },
    });
  };
    
  export const getShopData = (shopId) => {
    return request({
      url: '/api/shop',
      method: 'post',
      data: { shopId: shopId },
    });
  };