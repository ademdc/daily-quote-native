import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import FeelingScreen from '../../screens/FeelingScreen';
import FeelingDetailScreen from '../../screens/FeelingDetailScreen';
import PeriodFeelingScreen from '../../screens/PeriodFeelingScreen';

const FeelingStackNavigator = createStackNavigator({
  Feeling: FeelingScreen,
  FeelingDetail: FeelingDetailScreen,
  PeriodFeeling: PeriodFeelingScreen
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });


export default FeelingStackNavigator;