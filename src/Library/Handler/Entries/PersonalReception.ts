import Common from '@/Library/Common';

/*Body*/
export class Body {
  fid: string = '';
  fname: string = '';
  favatar: string = '';
  type: number = 20001;
  rank = '1';
  channelNo = Common.getChannelNo();
  duty: string = '';
  flowId: string = Common.getUuid(); // 唯一
  content: string = '';
}

/*Header*/
export class Header {
  flowId: string = '';
  token: string = '';
}

/*tsModel2*/
export class PersonalReception {
  lwp: string = '/sendFunctionMessage';
  body: Body = new Body();
  header: Header = new Header();
}
