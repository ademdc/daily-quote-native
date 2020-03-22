import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import AuthScreen from '../../screens/AuthScreen';

// const defaultStackNavOptions = {
// 	headerStyle: {
// 		backgroundColor: 'yellow'
// 	},
// 	headerTintColor: 'red'
// }

const AuthStackNavigator = createStackNavigator({
  AuthScreen: AuthScreen 
},{
    defaultNavigationOptions: defaultStackNavOptions
  }
);

export default AuthStackNavigator;