import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import TopBarProps from './Modal/TopBarProps';
import image from '@/Assets/image';
import Utils from '@/Utils';
import { Platform } from 'react-native';

export default class TopBar extends React.Component<TopBarProps> {
  constructor(props: TopBarProps) {
    super(props);
  }

  handleTouchable = (): void => {
    this.props.goBack && this.props.goBack();
  };

  render(): JSX.Element {
    return (
      <View style={styles.topBar}>
        <View style={styles.leftBox}>
          <TouchableHighlight
            onPress={() => this.handleTouchable()}
            underlayColor={''}>
            <Image style={styles.goBack} source={image.chatWindow.leftArrow} />
          </TouchableHighlight>
        </View>
        <View style={styles.titleBox}>
          <Text
            style={
              this.props.tcpStatus === 1 ? styles.title : styles.titleSpace
            }
            numberOfLines={1}>
            {this.props.title}
          </Text>
          {/* 0未连接 1连接成功 2连接中 3连接失败 */}
          {this.props.tcpStatus === 0 && (
            <Text style={styles.tcpStatus}>(未连接) </Text>
          )}
          {this.props.tcpStatus === 2 && (
            <Text style={styles.tcpStatus}>(连接中) </Text>
          )}
          {this.props.tcpStatus === 3 && (
            <Text style={styles.tcpStatus}>(连接中) </Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    width: Utils.screenW(),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Utils.scaleSize(48),
  },
  leftBox: {
    left: Utils.scaleSize(0),
    top: Utils.scaleSize(0),
    width: Utils.scaleSize(48),
    height: Utils.scaleSize(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBack: {
    width: Utils.scaleSize(24),
    height: Utils.scaleSize(24),
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Utils.screenW() - Utils.scaleSize(96),
    height: Utils.scaleSize(44),
  },
  titleSpace: {
    // width: Utils.screenW() - Utils.scaleSize(176),
    fontSize: Utils.scaleSize(18),
    color: '#353739',
    fontWeight: 'bold',
  },
  title: {
    // width: Utils.screenW() - Utils.scaleSize(96),
    fontSize: Utils.scaleSize(18),
    textAlign: 'center',
    color: '#353739',
    fontWeight: 'bold',
  },
  tcpStatus: {
    fontSize: Utils.scaleSize(18),
    color: '#353739',
    fontWeight: 'bold',
  },
});
