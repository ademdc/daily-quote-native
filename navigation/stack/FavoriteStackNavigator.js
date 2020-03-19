import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import FavoriteScreen from '../../screens/FavoritesScreen';
import Colors from '../../contants/colors';

import { Platform } from 'react-native';


// const defaultStackNavOptions = {
// 	defaultNavigationOptions: {
// 		headerStyle: {
// 			backgroundColor: Platform.OS === 'android' ? Colors.purpleMain : ''
// 		},
// 		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.blueMain
// 	}
// }

const FavoriteStackNavigator = createStackNavigator({
  FavoriteScreen: FavoriteScreen 
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });


export default FavoriteStackNavigator;