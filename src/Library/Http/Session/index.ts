/*
 * @Author: your name
 * @Date: 2020-11-13 11:08:55
 * @LastEditTime: 2020-11-13 13:42:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactnative-side-sdk\src\Library\Http\Session\index.ts
 */
/** @format */

import HttpBase from '../base';

interface UpdateClickNum {
  id: number;
}
//更新点赞次数
export const updateResolvedNum = <T>(params: UpdateClickNum) => {
  return HttpBase.putFormByToken<T>(
    '/bonade-customer-service/client-customer/updateResolvedNum',
    params,
  );
};
