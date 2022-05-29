/** @format */

import Watcher from '@/Library/Watcher';
import { HeartCheck } from './Entries/HeartCheck';
import Home from '@/Pages/Home';
import { TextMsg } from './Entries/Text';
import Constant from '../Constant';
import { Queue } from './Entries/queue';
import { NoCustomer } from './Entries/NoCustomer';
import { CustomPersonal } from './Entries/CustomPersonal';
import Common from '@/Library/Common';
import { EndSessionMsg } from './Entries/EndSessionMsg';
import { CloseWindowMsg } from './Entries/CloseWindow';
import { InviteAppraise } from './Entries/InviteAppraise';
import { PictureMsg, PictureBody } from './Entries/PictureMsg';
import { SurrenderSessionMsg, SurBody } from './Entries/SurrenderSession';
import { PersonalReception } from './Entries/PersonalReception';
import { SessionUser } from '@/Pages/Home/Model/HomeState';
import { QuestionAnswer } from './Entries/Question';
import { MessageReCell } from './Entries/messageReCell';
import { DocumentMsg } from './Entries/DocumentMsg';
import { CardBody, CardMsg } from './Entries/CardInfoMsg';

export default class Base {
  public static instance: Home;
  protected reactInstance: Home | null = null;
  protected timer: null | NodeJS.Timeout = null;
  public init(_this: Home): void {
    this.reactInstance = _this;
    Base.instance = _this;
    this.listenConnect(); // 监听连接
    this.listenToken(); // 监听token
    this.listenHeart(); // 监听心跳
    this.listenText(); // 监听文本
    this.listenQueue(); // 监听排队
    this.listenLogout(); //监听窗口登出
    this.listenOpenWindow(); // 监听窗口打开
    this.listenCloseWindow(); //监听窗口关闭
    this.listenPersonal(); // 监听转人工
    this.listenPicture(); // 监听图片发送
    this.listenCard(); // 监听卡片发送
    this.listenDocument(); // 监听文件发送
    this.listenSurrender(); // 监听转交会话
    this.listenEndSession(); // 监听会话结束
    this.listenInviteAppraise(); // 邀请评价
    this.listenWorkOffNoCustomer(); //不在上班时间无客服在线、
    this.listenWorkTimeNoCustomer();
    this.listenTcpStauts(); // tcp连接状态
    this.listenRepositoryMessage(); // 监听随机问题
    this.listenRecellMessage(); // 撤回消息
  }
  // 手动关闭websocket
  public static closeWs(): void {
    Watcher.$emit('closeWs');
  }
  /**
   *
   * @description 发送文本消息
   * @static
   * @param {string} content
   * @param {string} toId
   * @param {string} sno
   * @memberof Base
   */
  public static textSend(
    currentSessionInfo: SessionUser,
    content: string,
  ): void {
    const textMsg = new TextMsg();
    textMsg.body.sno = currentSessionInfo.sno || ''; // 咨询编号
    const newTextBody = JSON.stringify({ content: content });
    textMsg.body.body = newTextBody; // 内容
    textMsg.body.toId = currentSessionInfo.fid || ''; // 对方id
    textMsg.body.ftype = Common.getFtype(); // 客户
    // 预发送
    Base.instance.props.messageStore.pushMsgInList(textMsg.body);
    // 发送文本
    Watcher.$emit('sendMsg', textMsg);
  }

  /**
   *
   * @description 发送随机问题消息
   * @static
   * @param {string} content
   * @param {string} toId
   * @param {string} sno
   * @memberof Base
   */
  public static sendQuestionAnswer(
    currentSessionInfo: SessionUser,
    content: string,
    repositoryId: number,
    isAnswer: boolean,
  ): void {
    const questionAnswer = new QuestionAnswer();
    questionAnswer.body.sno = currentSessionInfo.sno || ''; // 咨询编号
    questionAnswer.body.toId = isAnswer
      ? currentSessionInfo.toId || ''
      : currentSessionInfo.fid || ''; // 对方id
    questionAnswer.body.fid = isAnswer
      ? currentSessionInfo.fid || ''
      : currentSessionInfo.toId || '';
    const newTextBody = JSON.stringify({ content: content });
    questionAnswer.body.body = newTextBody; // 内容
    questionAnswer.body.ftype = isAnswer ? 1 : 0;
    questionAnswer.body.repositoryId = repositoryId;
    questionAnswer.body.showAppraise = isAnswer;
    questionAnswer.body.favatar = isAnswer ? '' : Common.getAvatarUrl();
    questionAnswer.body.fname = isAnswer ? '机器人' : Common.getUserName();
    // 预发送
    Base.instance.props.messageStore.receiveQuestionMsg(questionAnswer.body);
    // 发送文本
    Watcher.$emit('sendMsg', questionAnswer);
  }

  public static personalReception() {
    // 发送转人工
    const personalReception = new PersonalReception();
    personalReception.header.token = Common.getToken();
    personalReception.header.flowId = Common.getUuid();
    personalReception.body.channelNo = Common.getChannelNo();
    personalReception.body.duty = '前端';
    personalReception.body.favatar = Common.getAvatarUrl();
    personalReception.body.fid = Common.getUserId();
    personalReception.body.fname = Common.getUserName();
    personalReception.body.rank = '1';
    //   发送数据;
    console.log('转人工的数据', personalReception);
    Watcher.$emit('sendMsg', personalReception);
  }
  /**
   *
   * @description 发送结束会话消息
   * @static
   * @param {string} toId 客户id
   * @param {string} sno 咨询编号
   * @memberof Base
   */
  public static endSession(currentSessionInfo: SessionUser): void {
    const endSession = new EndSessionMsg();
    endSession.body.sno = currentSessionInfo.sno || '';
    endSession.body.toId = currentSessionInfo.fid || '';
    endSession.body.sid = currentSessionInfo.id || 0;
    endSession.body.groupId = currentSessionInfo.groupId || '';
    Watcher.$emit('sendMsg', endSession);
  }
  /**
   *
   * @description 打开窗口消息
   * @static
   * @param {string} toId
   * @param {string} sno
   * @memberof Base
   */
  public static openWindow(currentSessionInfo: SessionUser): void {
    console.log(currentSessionInfo, '====');
    // const openWindow = new OpenWindowMsg();
    // openWindow.body.sno = currentSessionInfo.sno;
    // Watcher.$emit('sendMsg', openWindow);
  }
  /**
   *
   * @description 邀请评价
   * @static
   * @param {SessionUser} currentSessionInfo
   * @memberof Handler
   */
  public static inviteAppraiseSend(currentSessionInfo: SessionUser): void {
    const inviteAppraiseMsg = new InviteAppraise();
    inviteAppraiseMsg.body.sno = currentSessionInfo.sno || '';
    inviteAppraiseMsg.body.toId = currentSessionInfo.fid || '';
    inviteAppraiseMsg.body.sid = currentSessionInfo.id || 0;
    Watcher.$emit('sendMsg', inviteAppraiseMsg);
  }
  /**
   *
   * @description 发送图片消息
   * @param {PictureBody} body
   * @param {string} toId
   * @memberof Handler
   */
  public static pictureSend(
    body: PictureBody,
    flowId: string,
    tcpSend: boolean,
  ): void {
    const pictureMsg = new PictureMsg();
    // pictureMsg.body.channelNo =
    //   Base.instance.props.messageStore.currentSessionInfo.channelNo || '';
    pictureMsg.body.sno =
      Base.instance.props.messageStore.currentSessionInfo.sno || ''; // 咨询编号
    pictureMsg.body.toId =
      Base.instance.props.messageStore.currentSessionInfo.fid || ''; // 对方id
    pictureMsg.body.body = JSON.stringify(body);
    pictureMsg.body.flowId = flowId;
    !tcpSend && Base.instance.props.messageStore.receiveMsg(pictureMsg.body);
    tcpSend && Watcher.$emit('sendMsg', pictureMsg);
  }
  /**
   *
   * @description 发送卡片消息（业务线）
   * @param {CardBody} body
   * @memberof Handler
   */
  public static cardMessageSend(body: CardBody): void {
    const cardMsg = new CardMsg();
    // cardMsg.body.channelNo =
    //   Base.instance.props.messageStore.currentSessionInfo.channelNo || '';
    cardMsg.body.sno =
      Base.instance.props.messageStore.currentSessionInfo.sno || ''; // 咨询编号
    cardMsg.body.toId =
      Base.instance.props.messageStore.currentSessionInfo.fid || ''; // 对方id
    cardMsg.body.body = JSON.stringify(body);
    Base.instance.props.messageStore.receiveMsg(cardMsg.body);
    Watcher.$emit('sendMsg', cardMsg);
  }
  /**
   *
   * @description 关闭窗口消息
   * @static
   * @param {string} sno
   * @memberof Base
   */
  public static closeWindow(currentSessionInfo?: SessionUser): void {
    // 窗口未打开
    if (!currentSessionInfo) {
      return;
    }
    const closeWindowMsg = new CloseWindowMsg();
    closeWindowMsg.body.sno = currentSessionInfo.sno || '';
    Watcher.$emit('sendMsg', closeWindowMsg);
  }
  /**
   *
   * @description 转交会话
   * @static
   * @param {SessionUser} currentSessionInfo
   * @param {SurBody} SurrenderSessionParams
   * @memberof Base
   */
  public static surrenderSession(
    currentSessionInfo: SessionUser,
    SurrenderSessionParams: SurBody,
  ): void {
    const surrenderSession = new SurrenderSessionMsg();
    surrenderSession.body.body = SurrenderSessionParams;
    surrenderSession.body.sno = currentSessionInfo.sno || '';
    surrenderSession.body.sid = (currentSessionInfo.id || 0).toString();
    surrenderSession.body.toId = currentSessionInfo.fid || '';
    Watcher.$emit('sendMsg', surrenderSession);
  }
  /**
   *
   *
   * @param {PictureBody} body
   * @param {string} toId
   * @memberof Base
   */
  public pictureSend(body: PictureBody, toId: string): void {
    console.log(toId);
  }
  /**
   *
   *
   * @protected
   * @memberof Base
   */
  protected listenConnect(): void {}

  /**
   *
   * @description 监听token变化
   * @protected
   * @memberof Base
   */
  protected listenToken(): void {
    console.log(Constant.TOKEN_CHECK, '??');
    // token验证成功
    Watcher.$on(Constant.TOKEN_CHECK, () => {
      // 发布连通通知
      this.reactInstance &&
        this.reactInstance.props.messageStore.setTcpState(1);
      console.log('心跳发送');
      Watcher.$emit('sendMsg', new HeartCheck()); // 发送心跳
    });
  }

  /**
   *
   * @description tcp连接状态
   * @protected
   * @memberof Base
   */
  protected listenTcpStauts(): void {
    Watcher.$on(Constant.TCP_STAUTS, (value: number) => {
      // 连接断开，连接失败
      if (value === 3) {
        // 断开连接不显示转人工
        this.reactInstance?.props.messageStore.changeIsPersonalReception(0);
      }
      console.log('tcp连接状态', value);
      this.reactInstance &&
        this.reactInstance.props.messageStore.setTcpState(value);
    });
  }
  /**
   *
   * @description 监听心跳
   * @protected
   * @memberof Base
   */
  protected listenHeart(): void {
    // 监听心跳成功
    Watcher.$on(Constant.HEART_CHECKT, () => {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log('发送心跳');
        Watcher.$emit('sendMsg', new HeartCheck());
      }, 28 * 1000);
    });
  }

  // 发送文字消息
  protected listenText(): void {
    // 监听文字发送
    Watcher.$on(Constant.NORMAL_MESSAGE, (textMsg: TextMsg) => {
      console.log(textMsg, '监听文本发送成功');
      this.reactInstance &&
        this.reactInstance.props.messageStore.receiveMsg(textMsg.body);
      this.reactInstance &&
        this.reactInstance.props.messageStore.lintenCanAppraise(true); // 咨询过才可评价
      this.reactInstance && this.reactInstance.props.messageStore.scrollTop > 72
        ? this.reactInstance.props.messageStore.changeScrollBarStatus(
            'originalPosition',
          )
        : this.reactInstance?.props.messageStore.changeScrollBarStatus(
            'toBottom',
          );
    });
  }

  // 监听撤回消息
  protected listenRecellMessage(): void {
    // 监听文字发送
    Watcher.$on(Constant.WITHDRAWAL_MESSAGE, (reCellMsg: MessageReCell) => {
      console.log(reCellMsg, '撤回消息');
      this.reactInstance?.props.messageStore.withdrawalOfMessage(
        reCellMsg.body,
      );
    });
  }

  // 知识库随机问题 问-答
  protected listenRepositoryMessage(): void {
    Watcher.$on(Constant.REPOSITORY_MESSAGE, (textMsg: QuestionAnswer) => {
      if (this.reactInstance) {
        const { messageStore } = this.reactInstance.props;
        messageStore.receiveQuestionMsg(textMsg.body);
        //问题发送成功 再发送消息
        messageStore.currentRepository.id &&
          Base.sendQuestionAnswer(
            messageStore.currentSessionInfo,
            messageStore.currentRepository.answer || '',
            messageStore.currentRepository.id,
            true,
          );

        this.reactInstance.props.messageStore.scrollTop > 72
          ? this.reactInstance.props.messageStore.changeScrollBarStatus(
              'originalPosition',
            )
          : this.reactInstance?.props.messageStore.changeScrollBarStatus(
              'toBottom',
            );
        // 发送完答案将当前的知识库清空
        this.reactInstance.props.messageStore.changeIsCurrentRepository({});
      }
    });
  }

  // 排队人数广播
  protected listenQueue(): void {
    // 监听排队人数变化
    Watcher.$on(Constant.QUEUE_NUMBER, (msg: Queue) => {
      console.log('监听排队人数：', msg);
    });
  }

  // 不在上班时间无客服-紧急联系客服
  protected listenWorkOffNoCustomer(): void {
    Watcher.$on(Constant.WORK_OFF_NO_CUSTOMER, (msg: NoCustomer) => {
      this.reactInstance &&
        this.reactInstance.props.messageStore.lintenHasCustomer(msg.body);
    });
  }

  // 在上班时间没有客服在线
  protected listenWorkTimeNoCustomer(): void {
    Watcher.$on(Constant.WORK_TIME_NO_CUSTOMER, (msg: NoCustomer) => {
      this.reactInstance &&
        this.reactInstance.showNoServiceDailog(msg.errorMsg);
    });
  }

  // 监听登出
  protected listenLogout(): void {
    Watcher.$on(Constant.LOGOUT, () => {
      console.log('登出了');
    });
  }

  // 打开窗口
  protected listenOpenWindow(): void {
    Watcher.$on(Constant.OPEN_WINDOW, () => {
      console.log('打开窗口');
    });
  }

  // 监听关闭
  protected listenCloseWindow(): void {
    Watcher.$on(Constant.CLOSE_WINDOW, () => {
      console.log('打开窗口');
    });
  }

  // 监听图片
  protected listenPicture(): void {
    Watcher.$on(Constant.PICTURE_MESSAGE, (msg: PictureMsg) => {
      this.reactInstance &&
        msg.body.ftype !== 0 &&
        this.reactInstance.props.messageStore.receiveMsg(msg.body);
      this.reactInstance &&
        this.reactInstance.props.messageStore.lintenCanAppraise(true); // 咨询过才可评价
      this.reactInstance && this.reactInstance.props.messageStore.scrollTop > 72
        ? this.reactInstance.props.messageStore.changeScrollBarStatus(
            'originalPosition',
          )
        : this.reactInstance?.props.messageStore.changeScrollBarStatus(
            'toBottom',
          );
      console.log('图片成功', msg.body);
    });
  }

  // 监听卡片
  protected listenCard(): void {
    Watcher.$on(Constant.CARD_MESSAGE, () => {
      // console.log('卡片成功');
      this.reactInstance?.closeCard();
    });
  }

  // 监听文件
  protected listenDocument(): void {
    Watcher.$on(Constant.DOCUMENT_MESSAGE, (msg: DocumentMsg) => {
      this.reactInstance &&
        this.reactInstance.props.messageStore.receiveMsg(msg.body);
      this.reactInstance &&
        this.reactInstance.props.messageStore.lintenCanAppraise(true); // 咨询过才可评价
      this.reactInstance && this.reactInstance.props.messageStore.scrollTop > 72
        ? this.reactInstance.props.messageStore.changeScrollBarStatus(
            'originalPosition',
          )
        : this.reactInstance?.props.messageStore.changeScrollBarStatus(
            'toBottom',
          );
      console.log('发送文件成功', msg.body);
    });
  }

  // 转人工成功
  protected listenPersonal(): void {
    Watcher.$on(Constant.PERSONNEL_RECEPTION, (msg: CustomPersonal) => {
      console.log('转人工成功1', msg);
      if (this.reactInstance) {
        this.reactInstance.props.messageStore.changeCurrentSessionInfo(msg);
        // 是否有客服在线
        this.reactInstance.props.messageStore.lintenHasCustomer('');
        // 是否提示用户转人工
        // this.reactInstance.props.messageStore.changeShowtoPersonalTip(true);
      }
    });
  }

  // 监听转交会话
  protected listenSurrender(): void {
    Watcher.$on(Constant.SURRENDER_SESSION, () => {
      console.log('转交会话成功');
    });
  }

  // 监听结束会话
  protected listenEndSession(): void {
    Watcher.$on(Constant.END_SESSION, (msg: CustomPersonal) => {
      console.log('结束会话', msg, msg.body);
      this.reactInstance &&
        this.reactInstance.props.messageStore.receiveMsg(msg.body);
      this.reactInstance &&
        this.reactInstance.props.messageStore.lintenEndSession(true);
      //不处于转人工状态
      this.reactInstance &&
        this.reactInstance.props.messageStore.changeIsPersonalReception(0);
      msg.body.fid = '';
      msg.body.sno = '';
      this.reactInstance?.props.messageStore.changeCurrentSessionInfo(msg);
      // 客服端手动关闭会话，会话设置自动关闭会话，转交会话触发的关闭会话的，如果用户端还在客服聊天页面则不自动转人工
      this.reactInstance?.props.messageStore.changeNormalEndSession(true);
    });
  }

  // 邀请评价
  protected listenInviteAppraise(): void {
    Watcher.$on(Constant.INVITE_APPRAISE, (msg: InviteAppraise) => {
      this.reactInstance &&
        this.reactInstance.props.messageStore.receiveMsg(msg.body);
      console.log('邀请成功', msg);
    });
  }
}
