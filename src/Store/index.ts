/*
 * @Author: your name
 * @Date: 2020-11-13 11:08:56
 * @LastEditTime: 2020-11-13 13:53:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactnative-side-sdk\src\Store\index.ts
 */
import UserStore from './modules/UserStore';
import CardMessgeStore from './modules/cardMessgeStore';
export default {
  user: new UserStore(),
  cardMessgeStore: new CardMessgeStore(),
};
