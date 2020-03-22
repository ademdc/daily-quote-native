import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import FavoriteScreen from '../../screens/FavoritesScreen';
import Colors from '../../contants/colors';

import { Platform } from 'react-native';


const FavoriteStackNavigator = createStackNavigator({
  FavoriteScreen: FavoriteScreen 
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });


export default FavoriteStackNavigator;