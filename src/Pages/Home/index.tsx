import * as React from 'react';
import {
  StyleSheet,
  Linking,
  Keyboard,
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  Text
} from 'react-native';
import Utils from '@/Utils';

import { Toast, Alert, Drawer } from 'teaset';
import { observer, inject } from 'mobx-react';
import HomeProps from './Model/HomeProps';
import { HomeState } from './Model/HomeState';
import Common from '@/Library/Common';
import GlobalVar from '@/GlobalVar';
import Base from '../Base';

let token = '';
let nativeEmitter: NativeEventEmitter | null = null;
let InitParams: EmitterSubscription | null = null;

@observer
export default class Home extends Base<HomeProps, HomeState> {
  private timer: any = null;
  phoneNumber: string = '';
  constructor(props: HomeProps) {
    super(props);
    GlobalVar.comingCustomServicePage = true;
    // 初始化原生传递事件
    this.listenNative();
    // 初始化组件状态
    this.state = new HomeState();
  }
  // 监听原生事件
  listenNative() {
    if (Platform.OS === 'android' && nativeEmitter === null) {
      nativeEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    } else {
      nativeEmitter = new NativeEventEmitter(NativeModules.CustomerModule);
    }
    // 如果有就清理
    InitParams && InitParams.remove();
    InitParams = nativeEmitter.addListener('InitParams', (params) => {
      GlobalVar.env = params.env;

      
    });
  }

  componentDidMount() {
    Platform.OS === 'android' &&
      NativeModules.CustomerModule.hideCustomerActivity();
    this.BackHandler();
    if (!Common.getToken()) {
      return;
    }
  }

  render() {

    return (
      <View>
        <Text>hello world！</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  homeContainter: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
});
