/**
 * /*Body
 *
 * @format
 */
import Common from '@/Library/Common';
export class Body {
  sno: string = ''; // 咨询编号
  sid: number = 0; // 会话id
  fid: string = Common.getUserId();
  fname: string = Common.getUserName();
  favatar: string = Common.getAvatarUrl();
  groupId: string = ''; // 组id
  groupIdList: string[] = Common.getGroupIdList();
  toId: string = '';
  type = 20006;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class EndSessionMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
}
