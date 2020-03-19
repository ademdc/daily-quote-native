import { createStackNavigator } from 'react-navigation-stack';
// import { defaultStackNavOptions } from './constants';
import QuoteScreen from '../../screens/QuoteScreen';
import Colors from '../../contants/colors';
import { Platform } from 'react-native';

const defaultStackNavOptions = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.purpleMain : 'blue'
		},
	  	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.blueMain
	}
}

const QuoteStackNavigator = createStackNavigator({
  QuoteScreen: QuoteScreen,
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });



export default QuoteStackNavigator;