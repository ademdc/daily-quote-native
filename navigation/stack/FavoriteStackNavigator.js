import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import FavoriteScreen from '../../screens/FavoritesScreen';
import FavoriteDetailScreen from '../../screens/FavoriteDetailScreen';

const FavoriteStackNavigator = createStackNavigator({
  FavoriteScreen: FavoriteScreen,
  FavoriteDetailScreen: FavoriteDetailScreen
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });


export default FavoriteStackNavigator;