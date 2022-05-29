/** @format */

import Common from '@/Library/Common';
/** @format */
/*Body*/
export class Body {
  parentId: string = '';
  queueNumber: string = '';
  type = 30001;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class Queue {
  lwp: string = '';
  body: Body = new Body();
  header: Header = new Header();
  code = 0;
  errorMsg = '错误信息';
}
