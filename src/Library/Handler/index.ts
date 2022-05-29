/** @format */

import Watcher from '@/Library/Watcher';
import { TokenCheck } from './Entries/TokenCheckt';
import { HeartCheck } from './Entries/HeartCheck';
import { TextMsg } from './Entries/Text';
import Constant from '../Constant';
import { Queue } from './Entries/queue';
import { PictureMsg, PictureBody } from './Entries/PictureMsg';
import { CustomPersonal } from './Entries/CustomPersonal';
import Base from './base';
import Common from '@/Library/Common';
import { QuestionAnswerBody } from './Entries/Question';
import GlobalVar from '@/GlobalVar';
export default class Handler extends Base {
  constructor() {
    super();
  }
  /**
   *
   * @description 发送文本消息
   * @param {string} text
   * @param {string} toId
   * @param {number} ftype
   * @memberof Handler
   */
  public textSend(text: string, toId: string): void {
    const textMsg = new TextMsg();
    textMsg.body.body = text;
    textMsg.body.toId = toId;
    textMsg.body.ftype = 0; // 客户
    Watcher.$emit('sendMsg', textMsg);
  }
  /**
   *
   * @description 发送图片消息
   * @param {PictureBody} body
   * @param {string} toId
   * @memberof Handler
   */
  public pictureSend(body: PictureBody, toId: string): void {
    const pictureMsg = new PictureMsg();
    pictureMsg.body.body = JSON.stringify(body);
    pictureMsg.body.toId = toId;
    pictureMsg.body.ftype = 0; // 客服
    Watcher.$emit('sendMsg', pictureMsg);
  }

  /**
   *
   *监听连接
   * @protected
   * @memberof Handler
   */
  protected listenConnect(): void {
    // 连接成功
    Watcher.$on('connectSuccess', () => {
      const token = new TokenCheck();
      token.header.token = Common.getToken();
      token.header.flowId = Common.getUuid();
      // 发送消息
      console.log('连接成功');
      Watcher.$emit('sendMsg', token);
    });
  }

  // 监听token检查
  protected listenToken(): void {
    // token验证成功
    Watcher.$on(Constant.TOKEN_CHECK, (msg: TokenCheck) => {
      console.log('每词重连都到这里吗？------------------------', msg);
      // 已经转人工不再显示随机问题
      if (
        !msg.body.hasValidSession &&
        !this.reactInstance?.props.messageStore.normalEndSession
      ) {
        // 机器人打招呼
        const body = new QuestionAnswerBody();
        body.ftype = 1;
        body.noShowTextLoading = true;
        body.favatar = '';
        body.body = JSON.stringify({ content: 'HI~请问您咨询什么问题？' });
        this.reactInstance?.props.messageStore.receiveMsg(body);
        // 随机问题
        this.reactInstance?.repositoryList();
      }

      // 首页已请求则不再请求，否则重连都重新获取历史记录
      if (!GlobalVar.hasPostHistory) {
        // 清空历史消息记录
        this.reactInstance?.props.messageStore.clearMsgData();
        // 获取历史消息记录（获取断开连接应接受的消息）
        this.reactInstance?.getChatWindowSessionList('');
      }
      GlobalVar.hasPostHistory = false;
      // 不在客服页面，已经转人工都不转;客服端手动关闭会话，会话设置自动关闭会话，转交会话触发的关闭会话的，如果用户端还在客服聊天页面则不自动转人工
      if (
        GlobalVar.comingCustomServicePage &&
        this.reactInstance?.props.messageStore.isPersonalReception === 0 &&
        !this.reactInstance?.props.messageStore.normalEndSession
      ) {
        Base.personalReception();
      }

      // 发布tcp连通通知
      this.reactInstance &&
        this.reactInstance.props.messageStore.setTcpState(1);
      this.reactInstance &&
        this.reactInstance.props.messageStore.changeTransferToManNotice(
          msg.body.hasValidSession || false,
        );
      // 发送心跳
      Watcher.$emit('sendMsg', new HeartCheck());
    });
  }

  // 排队人数广播 客服only
  protected listenQueue(): void {
    // 监听排队人数变化
    Watcher.$on(Constant.QUEUE_NUMBER, (msg: Queue) => {
      this.reactInstance &&
        this.reactInstance.props.messageStore.receiveMsg(msg.body);
      console.log('监听排队人数变化:', msg);
    });
  }

  // 监听被踢  客服only
  protected listenLogout(): void {
    Watcher.$on(Constant.LOGOUT, () => {
      console.log('监听被踢');
    });
  }

  // 转人工成功
  protected listenPersonal(): void {
    Watcher.$on(Constant.PERSONNEL_RECEPTION, (msg: CustomPersonal) => {
      console.log('转人工成功', msg);
      const body = { ...msg.body, flowId: Common.getUuid() };
      if (this.reactInstance) {
        msg.body.notice &&
          this.reactInstance.props.messageStore.changePersonalNotice(
            msg.body.notice,
          );
        this.reactInstance.props.messageStore.changeCurrentSessionInfo(msg);
        // 存储咨询编号
        Common.setSno(msg.body.sno || '');
        this.reactInstance.props.messageStore.receiveMsg(body);
        // 是否有客服在线
        this.reactInstance.props.messageStore.lintenHasCustomer('');
        // 是否已转人工 state 0是排队 1是转人工成功
        this.reactInstance.props.messageStore.changeIsPersonalReception(
          msg.body.state === 1 ? 1 : 2,
        );
        // 是否提示用户转人工
        // this.reactInstance.props.messageStore.changeShowtoPersonalTip(true);
        // 会话激活
        this.reactInstance.props.messageStore.lintenEndSession(false);
      }
    });
  }
}
