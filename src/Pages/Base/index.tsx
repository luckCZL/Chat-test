import GlobalVar from '@/GlobalVar';
import * as React from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  NativeModules,
  Platform,
} from 'react-native';
export default class Base<P = any, S = any> extends React.Component<P, S> {
  BackHandlerKey: NativeEventSubscription | null = null;
  BackHandler() {
    // console.warn('=??');
    if (Platform.OS === 'android') {
      this.BackHandlerKey = BackHandler.addEventListener(
        'hardwareBackPress',
        (): boolean => {
          // console.warn(this.props.navigation.canGoBack(), '==');
          // 可以返回rn路由栈
          if (this.props.navigation.canGoBack()) {
            return false;
            // 不能返回rn路由栈
          } else {
            this.nativeGoBack();
            return true;
          }
        },
      );
    }
  }
  nativeGoBack() {
    GlobalVar.comingCustomServicePage = false;
    NativeModules.CustomerModule.back();
  }
}
