/** @format */

import Utils from '@/Utils/index';
import Common from '@/Library/Common';
/**
 * /*Body
 *
 * @format
 */

export class Body {
  id?: string;
  sno: string = ''; // 咨询编号
  fid: string = Common.getUserId(); // 用户id
  fname: string = Common.getUserName(); // 用户名
  favatar: string = Common.getAvatarUrl(); // 用户头像
  ftype: number = Common.getFtype(); // 1-客服 2-客户
  toId = ''; // 对方用户id
  type = 10001; // 类型
  body = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
  channelNo: string = Common.getChannelNo();
}

/*Header*/
export class Header {
  flowId: string = Utils.getUuid(); // 本地唯一id
  token: string = ''; // 令牌
}

/*tsModel2*/
export class TextMsg {
  lwp = '/sendNormalMessage';
  body: Body = new Body();
  header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
