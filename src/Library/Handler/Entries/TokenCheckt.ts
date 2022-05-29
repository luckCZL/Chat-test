/** @format */

import Common from '@/Library/Common';
/** @format */
/*Header*/
export class Header {
  flowId: string = '';
  token: string = '';
}

/*tsModel1*/
export class TokenCheckFail {
  code: number = 0;
  data: null | undefined;
  isSuccess: boolean = false;
  message: string = '';
  timestamp: number = 0;
}

export class Body {
  type = '9001';
  flowId: string = Common.getUuid(); // 唯一
  channelNo: string = Common.getChannelNo();
  userType: number = 1; // 用户类型1
  hasValidSession?: boolean = false;
}

/*tsModel1*/
export class TokenCheck {
  lwp = '/reg';
  header: Header = new Header();
  body: Body = new Body();
}
