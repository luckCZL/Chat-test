/**
 * /*Body
 *
 * @format
 */
import Common from '@/Library/Common';
export class Body {
  sno: string = '';
  sid: string = '';
  fid: string = Common.getUserId();
  type = 20003;
  flowId: string = Common.getUuid();
}

/*Header*/
export class Header {
  token: string = Common.getToken();
}

/*tsModel2*/
export class CloseWindowMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
