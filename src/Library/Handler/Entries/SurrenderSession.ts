/** @format */

import Common from '@/Library/Common';
/**
 * /*Body
 *
 * @format
 */

export class SurBody {
  chatId: string = '';
  chatName: string = '';
  chatAvatar: string = '';
  chatType: string = '';
  notice: string = '';
}

/*Body*/
export class Body {
  sno: string = '';
  sid: string = '';
  toId: string = '';
  fid: string = Common.getUserId();
  fname: string = Common.getUserName();
  favatar: string = Common.getAvatarUrl();
  type = 20004;
  body: SurBody = new SurBody();
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel3*/
export class SurrenderSessionMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
}
