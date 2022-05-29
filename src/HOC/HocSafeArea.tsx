import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
const isIos = Platform.OS === 'ios';
export default function (WrapComponent: Function) {
  return class extends React.Component {
    render() {
      const { props } = this;
      return isIos ? (
        <SafeAreaView style={styles.container}>
          <WrapComponent {...props} />
        </SafeAreaView>
      ) : (
        <WrapComponent {...props} />
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
