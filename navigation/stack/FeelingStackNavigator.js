import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import FeelingScreen from '../../screens/FeelingScreen';
import FavoriteDetailScreen from '../../screens/FavoriteDetailScreen';

const FeelingStackNavigator = createStackNavigator({
  FeelingScreen: FeelingScreen,
  FavoriteDetailScreen: FavoriteDetailScreen
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });


export default FeelingStackNavigator;