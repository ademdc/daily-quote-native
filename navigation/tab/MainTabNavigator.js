import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';

import QuoteScreen from '../../screens/QuoteScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../contants/colors';

const MainTabNavigator = createBottomTabNavigator({
	QuoteScreen: {
		screen: QuoteScreen,
		navigationOptions: {
			tabBarLabel: 'Quote of day',
			tabBarIcon: (tabInfo) => {
				return (<Ionicons name='ios-home' size={25} color={tabInfo.tintColor} />);
			}
		}
	},
	FavoritesScreen: {
		screen: FavoritesScreen,
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: (tabInfo) => {
				return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />);
			}
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: Colors.blueMain
	}
});

export default MainTabNavigator;