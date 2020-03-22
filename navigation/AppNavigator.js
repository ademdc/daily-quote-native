import { createAppContainer } from 'react-navigation';
import MainDrawerNavigator from './drawer/MainDrawerNavigator';
import { createSwitchNavigator } from 'react-navigation-switch-transitioner'
import StartupScreen from '../screens/StartupScreen';

const MainNavigator = createSwitchNavigator({
  StartupScreen: StartupScreen,
  MainDrawerNavigator: MainDrawerNavigator
});

export default createAppContainer(MainNavigator);
