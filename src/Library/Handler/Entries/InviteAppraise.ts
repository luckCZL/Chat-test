/** @format */

import Common from '@/Library/Common';
/**
 * /*Body
 *
 * @format
 */

export class Body {
  sno: string = '';
  sid: number = 0;
  toId: string = '';
  fid: string = Common.getUserId();
  fname: string = Common.getUserName();
  favatar: string = Common.getAvatarUrl();
  type = 20005;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class InviteAppraise {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
}
