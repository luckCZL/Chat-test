import UserDefaultData from './model';
import { observable, action } from 'mobx';
class UserStore {
  @observable userInfo = new UserDefaultData();
  @action saveUserInfo(userInfo: UserDefaultData): void {
    this.userInfo = { ...this.userInfo, ...userInfo };
  }
}
export default UserStore;
