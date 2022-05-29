import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import TopBarProps from './Modal/TopBarProps';
import image from '@/Assets/image';
import Utils from '@/Utils';

export default class TopBar extends React.Component<TopBarProps> {
  constructor(props: TopBarProps) {
    super(props);
  }

  handleTouchable = (): void => {
    this.props.goBack && this.props.goBack();
  };

  render(): JSX.Element {
    let { tabBarExtraContent } = this.props;
    return (
      <View style={styles.topBar}>
        <View style={styles.leftBox}>
          <TouchableHighlight
            onPress={() => this.handleTouchable()}
            underlayColor={''}>
            <Image style={styles.goBack} source={image.chatWindow.leftArrow} />
          </TouchableHighlight>
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.tabBarExtra}>{tabBarExtraContent}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    position: 'relative',
    height: Utils.scaleSize(44),
    width: Utils.screenW(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBox: {
    position: 'absolute',
    left: Utils.scaleSize(0),
    top: Utils.scaleSize(0),
    width: Utils.scaleSize(36),
    height: Utils.scaleSize(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBack: {
    width: Utils.scaleSize(24),
    height: Utils.scaleSize(24),
  },
  title: {
    fontSize: Utils.scaleSize(18),
    color: '#000',
    fontWeight: 'bold',
  },
  tabBarExtra: {
    position: 'absolute',
    right: Utils.scaleSize(16),
  },
});
