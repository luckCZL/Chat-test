import * as React from 'react';

import Home from '@/Pages/Home';
import PreviewFile from '@/Pages/PreviewFile';
import LeaveMessage from '@/Pages/LeaveMessage';
import Login from '@/Pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import store from '@/Store';
import { Provider } from 'mobx-react';
import { TopView } from 'teaset';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import GlobalVar from '../GlobalVar/index';
const Stack = createStackNavigator();

interface Props {
  env: string;
}

export default function App() {
  return (
    <View style={styles.containterBox}>
      <Provider {...store}>
        <TopView>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              headerMode="none"
              screenOptions={() => ({
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
              })}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="PreviewFile" component={PreviewFile} />
            </Stack.Navigator>
          </NavigationContainer>
        </TopView>
      </Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  containterBox: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
