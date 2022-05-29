/** @format */

import ZtHttpBase from '../baseLogin';
import HttpBase from '../base';
interface LoginByPwd {
  grant_type: string;
  username: string;
  password: string;
  channel: string;
}
interface UserInfo {
  avatar: string;
  channel: string;
  gender: string;
  mobile: string;
  openId: string;
  sys: string;
  userName: string;
}
interface LoginByPwdResult {
  access_token: string;
  clientId: string;
  jti: string;
  refresh_token: string;
  token_type: string;
  userInfo: UserInfo;
  userKey: string;
}
interface LoginByTicket {
  ticket: string;
  channelNo: string;
}
/*UserInfo*/
interface UserInfo {
  companyId: string;
  gender: string;
  openId: string;
  openSystem: string;
  channel: string;
  mobile: string;
  aClientId: string;
  avatar: string;
  sys: string;
  userName: string;
  userId: string;
  staffId: string;
}

/*LoginByTicketRes*/
interface LoginByTicketRes {
  access_token: string;
  userInfo: UserInfo;
  companyId: string;
  clientId: string;
  phoneNumber: string;
  businessIndex: number;
  companyName: string;
  channel: string;
  token_type: string;
  userKey: string;
  jti: string;
  channelNo: string;
}

// 密码登录
const loginByPwd = <T>(params: LoginByPwd) => {
  return ZtHttpBase.postForm<LoginByPwdResult>(
    '/oauth2-zt/oauth/login',
    params,
  );
};
// ticket登录
const loginByTicket = <T>(params: LoginByTicket) => {
  return HttpBase.post<LoginByTicketRes>(
    '/bonade-customer-service/client-customer/notoken/ticketLogin',
    params,
  );
};
export default {
  loginByPwd,
  loginByTicket,
};
