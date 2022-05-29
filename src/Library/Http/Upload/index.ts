/** @format */
import HttpBase from '../base';
import Common from '@/Library/Common';
import axios from 'axios';
import { PicksRes } from '@/Pages/Home/Model/HomePick';
interface GetPolicy {
  fileName: string;
}
interface GetPolicyResult {
  accessId: string;
  callback: string;
  dir: string;
  expire: string;
  host: string;
  policy: string;
  signature: string;
}

// 转接窗口数据
export const GetPolicy = (params: GetPolicy) => {
  return HttpBase.getFormByToken<GetPolicyResult>(
    '/bonade-customer-service/uploadApi/notoken/getPolicy',
    params,
  );
};

// console.log(HttpBase);

// 配置
const config = {
    headers: {contentType: 'multipart/form-data'},
};
// 获取上传域名与参数
export async function getHostAndParams(fileName: string) {
    const res = await HttpBase.getJsonByToken('/bonade-customer-service/uploadApi/notoken/getPolicy');
    console.log(res)
    return Common.getSignature(res.data, fileName);
}
// 上传到阿里云
export async function uploadToAliYun(file: {
  uri: string;
  filename: string | undefined;
}, onUploadProgress: (progressEvent: ProgressEventType) => void) {
    // 准备参数
    const formData = new FormData();
    // 参数;
    const {host, multipartParams} = await getHostAndParams(file.uri);
    const curfile = {
        uri: file.uri,
        type: 'multipart/form-data',
        name: file.filename,
    };
    
    const sendParams = {...multipartParams};
    // 加入表单
    Object.keys(sendParams).forEach(key => formData.append(key, multipartParams[key]));
    formData.append('file', curfile);
    // 结果
    try {
        const res = await axios.post(host, formData, {
            ...config,
            onUploadProgress,
        });

        if (res.data.code === 10200) {
            return {code: res.data.code, data: res.data.data};
        }
    } catch (error) {
        console.info(error.response);
    }
}

type ProgressEventType = {
    loaded: number;
    total: number;
    type?: string;
};
