/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/Route';
import { name as appName } from './app.json';
import { Theme } from 'teaset';

Theme.set({ screenColor: '#F6F7F9' });
AppRegistry.registerComponent(appName, () => App);
