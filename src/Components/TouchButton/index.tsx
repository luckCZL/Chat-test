import React from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import touchButtomProps from './Model/touchButtomProps';

export default class TouchButtom extends React.Component<touchButtomProps> {
  constructor(props: touchButtomProps) {
    super(props);
  }
  handlePress() {
    this.props.onPress && this.props.onPress();
  }
  render(): JSX.Element {
    return (
      <>
        {Platform.OS === 'ios' ? (
          <TouchableHighlight
            onPress={() => this.handlePress()}
            underlayColor="#eee">
            <View>{this.props.children}</View>
          </TouchableHighlight>
        ) : (
          <TouchableNativeFeedback onPress={() => this.handlePress()}>
            <View>{this.props.children}</View>
          </TouchableNativeFeedback>
        )}
      </>
    );
  }
}
