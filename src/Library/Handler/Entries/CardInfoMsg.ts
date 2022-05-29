import Common from '@/Library/Common';

export class CardBody {
  pic?: string = '';
  url?: string = '';
  desc?: string[] = [''];
  content?: string = '卡片';
}

export class Body {
  sno: string = ''; // 咨询编号
  channelNo: string = Common.getChannelNo();
  fid: string = Common.getUserId(); // 用户id
  fname: string = Common.getUserName(); // 用户名
  favatar: string = Common.getAvatarUrl(); // 用户头像
  ftype: number = Common.getFtype(); // 1-客服 0-客户
  toId = ''; // 对方用户id
  type = 10006; // 类型
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
  body = ''; // 实际内容
}
export class Header {
  flowId: string = Common.getUuid(); // 本地唯一id
  token: string = ''; // 令牌
}
export class CardMsg {
  lwp: string = '/sendNormalMessage';
  body: Body = new Body();
  header: Header = new Header();
  code = 0;
  errorMsg = '错误内容';
}
