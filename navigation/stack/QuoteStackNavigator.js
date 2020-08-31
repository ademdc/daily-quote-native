import { createStackNavigator } from 'react-navigation-stack';
import { defaultStackNavOptions } from './constants';
import QuoteScreen from '../../screens/QuoteScreen';

const QuoteStackNavigator = createStackNavigator({
    QuoteScreen: QuoteScreen,
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });

export default QuoteStackNavigator;