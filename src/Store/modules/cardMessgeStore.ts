import { CardBody } from '@/Library/Handler/Entries/CardInfoMsg';
import { observable, action } from 'mobx';
export default class CardMessgeStore {
  // 是否展示卡片
  @observable showCard: boolean = false;
  @observable iphoneHeight?: number;
  // 卡片消息
  @observable cardInfo: CardBody = {};
  @action changeShowCard(value: boolean) {
    this.showCard = value;
  }
  @action changeCardInfo(value: CardBody) {
    this.cardInfo = value;
  }
  @action setiphoneHeight(height: number) {
    this.iphoneHeight = height;
  }
}
