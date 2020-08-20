import React from 'react';
import QuoteStackNavigator from '../stack/QuoteStackNavigator';
import FavoriteStackNavigator from '../stack/FavoriteStackNavigator';
import FeelingStackNavigator from '../stack/FeelingStackNavigator';

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
	},
	FeelingScreen: {
		screen: FeelingStackNavigator,
		navigationOptions: {
			tabBarLabel: 'Feelings',
			tabBarIcon: (tabInfo) => {
				return (<Ionicons name='ios-body' size={25} color={tabInfo.tintColor} />);
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