/** @format */
import TcpBase from './base';
import { Toast } from 'teaset';
export default class Tcp extends TcpBase {
  protected showTips(tips: string): void {
    Toast.message(tips, {
      duration: 2000,
    });
  }
}
