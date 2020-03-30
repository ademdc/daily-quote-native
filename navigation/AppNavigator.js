import MainDrawerNavigator from './drawer/MainDrawerNavigator';
import StartupScreen from '../screens/StartupScreen';

import { createSwitchNavigator } from 'react-navigation-switch-transitioner'
import { createAppContainer } from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  StartupScreen: StartupScreen,
  MainDrawerNavigator: MainDrawerNavigator
});

export default createAppContainer(MainNavigator);
