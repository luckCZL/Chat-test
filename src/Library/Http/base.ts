/** @format */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import Common from '../Common';
import Config from '../Config';
// import GlobalVariables from '../GlobalVariables';
// 业务层返回数据
interface BussinessResType<T> {
  code: number;
  data: T;
  isSuccess: boolean;
  message: string;
  timestamp: number;
}
export default class Base {
  constructor() {
    Base.interceptors();
  }
  private static Instance: AxiosInstance = axios.create();

  //初始化
  public static interceptors() {
    Base.Instance.interceptors.response.use(
      (success) => {
        return success;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  // get请求
  public static async get<T>(url: string, params?: any, config = {}) {
    const res = await Base.Instance.get<BussinessResType<T>>(url, {
      params,
      baseURL: Config.getConfig().baseURL,
      ...config,
    });
    return res.data;
  }
  // 下载文件专用
  public static async getFile<T>(url: string, params?: any, config = {}) {
    const res = await Base.Instance.get<T>(url, {
      params,
      baseURL: Config.getConfig().baseURL,
      ...config,
    });
    return res.data;
  }
  // post请求
  public static async post<T>(url: string, data: any, config = {}) {
    const res = await Base.Instance.post<BussinessResType<T>>(url, data, {
      baseURL: Config.getConfig().baseURL,
      ...config,
    });
    return res.data;
  }
  // delete请求
  public static async del<T>(url: string, data: any, config = {}) {
    const res = await Base.Instance.delete<BussinessResType<T>>(url, {
      params: data,
      baseURL: Config.getConfig().baseURL,
      ...config,
    });
    return res.data;
  }
  // put请求
  public static async put<T>(url: string, data: any, config = {}) {
    const res = await Base.Instance.put<BussinessResType<T>>(url, data, {
      baseURL: Config.getConfig().baseURL,
      ...config,
    });
    return res.data;
  }

  // post请求form格式
  public static postForm<T>(url: string, data: any, config = {}) {
    const formConfig = Base.addFormToHeaders(config);
    const newConfig = Base.transformQs(formConfig);
    return Base.post<T>(url, data, newConfig);
  }
  // postFormByToken
  public static async postFormByToken<T>(url: string, data: any, config = {}) {
    const formConfig = Base.addFormToHeaders(config);
    const newConfig = Base.addTokenAndStaff2Headers(formConfig);
    return Base.post<T>(url, data, newConfig);
  }
  // JSON格式 带token的 post
  public static async postJsonByToken<T>(url: string, data?: any, config = {}) {
    const jsonConfig = Base.addJsonToHeaders(config);
    const newConfig = Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.post<T>(url, data, newConfig);
  }
  // JSON格式 带token的 get
  public static async getJsonByToken<T>(url: string, data?: any, config = {}) {
    const jsonConfig = Base.addJsonToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.get<T>(url, data, newConfig);
  }
  // form表单格式 带token的 get
  public static async getFormByToken<T>(url: string, data?: any, config = {}) {
    const jsonConfig = Base.addFormToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.get<T>(url, data, newConfig);
  }
  // json格式 带token的 put
  public static async putJsonByToken<T>(url: string, data: any, config = {}) {
    const jsonConfig = Base.addJsonToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.put<T>(url, data, newConfig);
  }

  // form格式 带token的 put
  public static async putFormByToken<T>(url: string, data: any, config = {}) {
    const formConfig = Base.addFormToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(formConfig);
    return Base.put<T>(url, qs.stringify(data), newConfig);
  }
  // json 带token delete
  public static async deleteJsonByToken<T>(
    url: string,
    data: any,
    config = {},
  ) {
    const jsonConfig = Base.addJsonToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.del<T>(url, data, newConfig);
  }

  // form 带token delete
  public static async deleteFormByToken<T>(
    url: string,
    data: any,
    config = {},
  ) {
    const jsonConfig = Base.addJsonToHeaders(config);
    const newConfig = await Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.del<T>(url, data, newConfig);
  }
  // 下载文件带token
  public static async getFileFormByToken<T>(
    url: string,
    data: any,
    config = {},
  ) {
    const jsonConfig = Base.addFormToHeaders(config);
    const newConfig = Base.addTokenAndStaff2Headers(jsonConfig);
    return Base.getFile<T>(url, data, { responseType: 'blob', ...newConfig });
  }
  // 改为qs类型参数
  private static transformQs(config: any) {
    config.transformRequest = [
      function (data: any): string {
        return qs.stringify(data);
      },
    ];
    return config;
  }
  // 请求添加json标示
  private static addJsonToHeaders<T extends AxiosRequestConfig>(config: T): T {
    config.headers = config.headers
      ? Object.assign(config.headers, {
          ['Content-Type']: 'application/json; charset=UTF-8',
        })
      : { ['Content-Type']: 'application/json; charset=UTF-8' };
    config.transformRequest = [(data): string => JSON.stringify(data)];
    return config;
  }

  // 请求头添加表单标识
  private static addFormToHeaders<T extends AxiosRequestConfig>(config: T): T {
    config.headers = config.headers
      ? Object.assign(config.headers, {
          ContentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        })
      : { ContentType: 'application/x-www-form-urlencoded; charset=UTF-8' };
    return config;
  }
  // 添加token到头部
  private static addTokenAndStaff2Headers<T extends AxiosRequestConfig>(
    config: T,
  ): T {
    const accessToken = `${Common.getToken()}`;
    config.headers = config.headers
      ? Object.assign(config.headers, {
          Authorization: 'Bearer ' + accessToken,
        })
      : { Authorization: 'Bearer ' + accessToken };
    return config;
  }
}
