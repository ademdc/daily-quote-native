import React from 'react';
import QuoteStackNavigator from '../stack/QuoteStackNavigator';
import FavoriteStackNavigator from '../stack/FavoriteStackNavigator';
import Colors from '../../contants/colors';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

const MainTabNavigator = createBottomTabNavigator({
	QuoteScreen: {
		screen: QuoteStackNavigator,
		navigationOptions: {
			tabBarLabel: 'Quote of day',
			tabBarIcon: (tabInfo) => {
				return (<Ionicons name='ios-home' size={25} color={tabInfo.tintColor} />);
			}
		}
	},
	FavoritesScreen: {
		screen: FavoriteStackNavigator,
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: (tabInfo) => {
				return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />);
			}
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: Colors.blueMain,
		inactiveTintColor: Colors.blueLight
	}
});

export default MainTabNavigator;