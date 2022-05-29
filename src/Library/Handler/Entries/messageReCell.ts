/** @format */

import Common from '@/Library/Common';
/*Body*/
export class MessageReCellBody {
  id?: string;
  sno: string = ''; // 咨询编号
  fid: string = Common.getUserId(); // 用户id
  fname: string = Common.getUserName(); // 用户名
  favatar: string = Common.getAvatarUrl(); // 用户头像
  ftype: number = Common.getFtype(); // 1-客服 2-客户
  toId = ''; // 对方用户id
  type = 10004; // 类型
  flowId: string = Common.getUuid(); // 唯一
  body = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime?: number = new Date().getTime();
  channelNo = '';
  isText?: boolean = false; // 只有文本消息撤回才有重新编辑
}

/*Header*/
export class Header {
  token: string = Common.getToken();
}

/*tsModel2*/
export class MessageReCell {
  lwp: string = '';
  body: MessageReCellBody = new MessageReCellBody();
  header: Header = new Header();
}
