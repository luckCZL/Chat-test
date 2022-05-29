/** @format */

class Constant {
  static LOGOUT = '9003'; //登出
  static END_SESSION = '20006'; // 结束会话
  static OPEN_WINDOW = '20002'; //打开窗口
  static TOKEN_CHECK = '9001'; // token验证
  static CLOSE_WINDOW = '20003'; //关闭窗口
  static HEART_CHECKT = '9002'; //心跳消息
  static NORMAL_MESSAGE = '10001'; // 文字消息
  static INVITE_APPRAISE = '20005'; //邀请评价
  static SURRENDER_SESSION = '20004'; //转交会话
  static PERSONNEL_RECEPTION = '20001'; //转人工
  static PICTURE_MESSAGE = '10002'; //图片消息
  static DOCUMENT_MESSAGE = '10003'; // 文件消息
  static WITHDRAWAL_MESSAGE = '10004'; // 撤回消息
  static REPOSITORY_MESSAGE = '10005'; //知识库id
  static CARD_MESSAGE = '10006'; //卡片消息
  static QUEUE_NUMBER = '30001'; //排队人数广播
  static WORK_OFF_NO_CUSTOMER = '20008'; //不是上班时间 没有客服在线
  static WORK_TIME_NO_CUSTOMER = '20009'; //是上班时间 没有客服在线
  static TCP_STAUTS = '00000'; // TCP连接状态  0未连接 1连接成功 2连接中 3连接失败
}
export default Constant;
