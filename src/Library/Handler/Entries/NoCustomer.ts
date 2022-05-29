/** @format */

/*Header*/
export class Header {
  request: number = 0;
}

/*tsModel2*/
export class NoCustomer {
  lwp: string = '';
  body: string = '';
  header: Header = new Header();
  code = 0;
  errorMsg = '错误信息';
}
