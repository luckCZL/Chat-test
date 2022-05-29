import Common from '@/Library/Common';
import Utils from '@/Utils';
export class Data {
  id: number = 0;
  title: string = '';
  answer: string = '';
}

export class QuestionBody {
  id?: string;
  sno: string = ''; // 咨询编号
  fid: string = Common.getRobotQuestionId(); // 用户id
  fname: string = Common.getUserName(); // 用户名
  favatar: string = Common.getAvatarUrl(); // 用户头像
  toId = ''; // 对方用户id
  type = 10005; // 类型
  body: string = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
}

export class QuestionAnswerBody {
  body: string = '';
  repositoryId: number = 0;
  createTime: number = new Date().getTime();
  flowId: string = Common.getUuid();
  ftype: number = 0;
  id: string = '';
  sno: string = '';
  toId: string = '';
  type: number = 10005;
  appraise: number = 0; // 1好评 2差评
  showAppraise: boolean = false; // 显示点评
  noShowTextLoading: boolean = false;
  fid: string = Common.getUserId(); // 用户id
  fname: string = Common.getUserName(); // 用户名
  favatar: string = Common.getAvatarUrl(); // 用户头像
  updateTime: number = new Date().getTime();
  channelNo: string = Common.getChannelNo();
}

/*Header*/
export class Header {
  flowId: string = Utils.getUuid(); // 本地唯一id
  token: string = ''; // 令牌
}

/*tsModel2*/
export class QuestionAnswer {
  lwp = '/sendNormalMessage';
  body: QuestionAnswerBody = new QuestionAnswerBody();
  header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
