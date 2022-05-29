/** @format */

import Common from '@/Library/Common';
/** @format */

/*ChatDTO*/
export class ChatDTO {
  chatId: string = '';
  chatName: string = '';
  chatAvatar: string = '';
}
/*Body*/
export class Body {
  id: string = '';
  sno: string = '';
  fid: string = '';
  fname: string = '';
  favatar: string = '';
  msgId: string = '';
  msgTime: string = '';
  content: string = '';
  type: string = '';
  toId: string = '';
  groupId: string = '';
  unReadCount: string = '';
  state: string = '';
  top: string = '';
  startTime: string = '';
  endTime: string = '';
  createTime: string = '';
  updateTime: string = '';
  chatDTO: ChatDTO = { chatId: '', chatName: '', chatAvatar: '' };
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = '';
  token: string = '';
}

/*tsModel3*/
export class Personal {
  lwp: string = '';
  body: Body = new Body();
  header: Header = new Header();
  code: number = 0;
  errorMsg: string = '';
}
