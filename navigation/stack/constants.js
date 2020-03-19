import { Platform } from 'react-native';
import Colors from '../../contants/colors';

export const defaultStackNavOptions = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.purpleMain : 'yellow'
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.blueMain
	}
}