/** @format */

import Common from '@/Library/Common';

export class Header {
  flowId: string = Common.getUuid();
}

export class Body {
  type = 9002;
  flowId: string = ''; // 唯一
}

/*tsModel1*/
export class HeartCheck {
  lwp = '/idle';
  header: Header = new Header();
  body: Body = new Body();
  code?: number;
  errorMsg?: string;
}
