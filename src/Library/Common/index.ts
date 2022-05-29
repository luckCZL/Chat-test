/** @format */

import BaseCommon from './BaseCommon';
import GlobalVar from '../../GlobalVar/index';

class Common extends BaseCommon {
  private token: string = '';
  private userId: string = '';
  private userName: string = '';
  private avatarUrl: string = '';
  private channelNo: string = '';
  private channelName: string = '';
  private userWindowTitle: string = '';
  private sno: string = '';
  private fromPage: number | undefined;

  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getUserName() {
    return this.userName;
  }
  public setUserName(userName: string): void {
    this.userName = userName;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getRefreshToken() {
    return '';
  }
  public setToken(token: string): void {
    this.token = token;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getUserId() {
    return this.userId;
  }
  public setUserId(userId: string): void {
    this.userId = userId;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getToken() {
    return this.token;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getFtype() {
    return 0;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getLevel() {
    // const userLevel = JSON.parse(sessionStorage.getItem('userInfo')).level;
    return 1;
  }
  /**
   *
   *
   * @returns
   * @memberof Common
   */
  public getAvatarUrl() {
    return this.avatarUrl;
  }
  public setAvatarUrl(avatarUrl: string): void {
    this.avatarUrl = avatarUrl;
  }
  /**
   *
   * 渠道号
   * @returns
   * @memberof Common
   */
  public getChannelNo() {
    return this.channelNo;
  }
  public setSno(sno: string) {
    this.sno = sno;
  }
  public getSno() {
    return this.sno;
  }
  public setChannelNo(channelNo: string) {
    this.channelNo = channelNo;
  }
  // 渠道名称
  public getChannelName() {
    return this.channelName;
  }
  // 设置渠道名称
  public setChannelName(channelName: string) {
    this.channelName = channelName;
  }
  // 窗口的标题
  public getUserWindowTitle(): string {
    return this.userWindowTitle;
  }
  // 窗口的标题
  public setUserWindowTitle(userWindowTitle: string) {
    this.userWindowTitle = userWindowTitle;
  }
  // 暂时写死环境变量
  public getEnv() {
    return GlobalVar.env;
  }
  // 机器人回答答案的fid
  public getRobotAnswerId() {
    return '000';
  }
  // 机器人随机问题的fid
  public getRobotQuestionId() {
    return '0000';
  }
  // 入口位置
  public getFromPage() {
    return this.fromPage;
  }
  public setFromPage(value: number) {
    this.fromPage = value;
  }
}

export default new Common();
