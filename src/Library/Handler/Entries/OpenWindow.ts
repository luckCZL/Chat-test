/** @format */

import Common from '@/Library/Common';
/**
 * /*Body
 *
 * @format
 */

export class Body {
  sno: string = '';
  fid: string = Common.getUserId();
  type = 20002;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class OpenWindowMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
