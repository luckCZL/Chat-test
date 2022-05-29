/** @format */

import * as Upload from './Upload'; // 上传
import * as SeviceEvalute from './SeviceEvalute'; // 服务评价
import * as LeaveMsg from './LeaveMsg'; // 留言
import * as Session from './Session'; // 聊天列表
const Http = {
  ...Upload,
  ...SeviceEvalute,
  ...LeaveMsg,
  ...Session,
};

export default Http;
