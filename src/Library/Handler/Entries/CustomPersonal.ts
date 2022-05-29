/**
 * /*ChatDTO
 *
 * @format
 */

import { SessionUser } from '@/Pages/Home/Model/HomeState';

/*Header*/
export class Header {
  token: string = '';
}

/*tsModel3*/
export class CustomPersonal {
  lwp: string = '';
  body: SessionUser = new SessionUser();
  header: Header = new Header();
  code: number = 0;
  errorMsg: string = '';
}
