/** @format */
import Watcher from '@/Library/Watcher';
import { MsgResult } from './msgResult';
import Config from '@/Library/Config';
import ReconnectingWebSocket from 'reconnecting-websocket';
import GlobalVar from '@/GlobalVar';
import Constant from '../Constant';

export default class TcpBase {
  // socket实例
  private ws: ReconnectingWebSocket | null = null;
  // 不同环境配置
  private static wsUrl = '';
  /**
   *Creates an instance of TcpBase.
   * @memberof TcpBase
   */
  constructor() {
    // 监听发送
    Watcher.$on('sendMsg', (msg: unknown) => {
      this.ws
        ? this.ws.send(JSON.stringify(msg))
        : this.showTips('socket实例未建立');
    });
    // 监听关闭
    Watcher.$on('closeWs', () => {
      this.ws && this.ws.close();
      this.ws = null;
      Watcher.$clearAll();
      GlobalVar.isFirst = true;
      console.log('关闭');
    });
  }
  /**
   *
   * @description 显示提示
   * @protected
   * @param {string} tips
   * @memberof Base
   */
  protected showTips(tips: string): void {}
  /**
   *
   * @description 连接后端
   * @returns {void}
   * @memberof TcpBase
   */
  public connect(): void {
    GlobalVar.isFirst = false;
    // 不存在
    if (!this.ws) {
      this.createWs();
      return;
    }
    // 已关闭
    if (this.ws.readyState === ReconnectingWebSocket.CLOSED) {
      this.createWs();
      return;
    }
    // 断开中
    if (this.ws.readyState === ReconnectingWebSocket.CLOSING) {
      this.createWs();
      return;
    }
    // 已连接
    if (this.ws.readyState === ReconnectingWebSocket.OPEN) {
      console.log('已连接');
      return;
    }
    // 连接中
    if (this.ws.readyState === ReconnectingWebSocket.CONNECTING) {
      Watcher.$emit(Constant.TCP_STAUTS, 2);
      console.log('连接中');
      return;
    }
  }

  /**
   *
   * @description 创建长链
   * @private
   * @memberof TcpBase
   */
  private createWs() {
    this.ws = new ReconnectingWebSocket(Config.getConfig().webSocketUrl);
    this.ws.onopen = () => this.websocketOnOpen();
    this.ws.onclose = () => this.websocketClose();
    this.ws.onerror = (e) => this.websocketOnError(e);
    this.ws.onmessage = (e) => this.websocketOnMessage(e);
  }
  /**
   *
   * @description Socket连接成功
   * @private
   * @memberof TcpBase
   */
  private websocketOnOpen() {
    Watcher.$emit('connectSuccess');
  }
  /**
   *
   * @description 接收信息
   * @private
   * @memberof TcpBase
   */
  private websocketOnMessage(e: MessageEvent) {
    const msgData = JSON.parse(e.data);
    console.log(msgData, 'WS返回来的数据5555555555555555555');
    if (msgData.code === 20008 || msgData.code === 20009) {
      this.noCustomer(msgData);
      return;
    }
    if (msgData.code !== 10200) {
      this.showTips(msgData.errorMsg);
      return;
    }
    this.mySendMsg(msgData);
  }
  /**
   *
   * @description 没有在线客服的情况
   * @protected
   * @param {*} msgData
   * @memberof TcpBase
   */
  protected noCustomer(msgData: any): void {
    console.log('没有客服在线', msgData.code);
    Watcher.$emit(msgData.code, msgData);
  }

  private mySendMsg(myMsg: MsgResult) {
    Watcher.$emit(myMsg.body?.type || '', myMsg);
  }
  /**
   *
   * @description Socket连接失败
   * @private
   * @memberof TcpBase
   */
  private websocketOnError(e: Event) {
    Watcher.$emit(Constant.TCP_STAUTS, 3);
    console.log('链接失败', e);
  }
  /**
   *
   * @description Socket连接关闭
   * @private
   * @memberof TcpBase
   */
  public websocketClose(): void {
    Watcher.$emit(Constant.TCP_STAUTS, 3);
    console.log('链接关闭');
    // this.ws && (this.ws.onopen = null);
    // this.ws && (this.ws.onclose = null);
    // this.ws && (this.ws.onerror = null);
    // this.ws && (this.ws.onmessage = null);
    // this.ws = null;
    // this.connect();
  }
}
