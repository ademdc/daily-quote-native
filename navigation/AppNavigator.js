import React from 'react';

import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Platform } from 'react-native';

// import CategoriesScreen from '../screens/CategoriesScreen';
// import CategoryMealsScreen from '../screens/CategoryMealsScreen';
// import MealDetailScreen from '../screens/MealDetailScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import FiltersScreen from '../screens/FiltersScreen';

import QuoteScreen from '../screens/QuoteScreen';
import AboutScreen from '../screens/AboutScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Colors from '../contants/colors';
import { Ionicons } from '@expo/vector-icons';


// const defaultStackNavOptions = {
// 	defaultNavigationOptions: {
// 		headerStyle: {
// 			backgroundColor: Platform.OS === 'android' ? Colors.purpleMain : ''
// 		},
// 		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.blueMain
// 	}
// }
// const MealsNavigator = createStackNavigator({
//   Categories: {
// 		screen: CategoriesScreen
// 	},
//   CategoryMeals: {
// 		screen: CategoryMealsScreen
//   },
//   MealDetail: { 
// 		screen: MealDetailScreen
// 	}
// }, {
// 	defaultNavigationOptions: defaultStackNavOptions
	
// });

// const FavNavigator = createStackNavigator({
// 	Favorites: FavoritesScreen,
// 	MealDetail: MealDetailScreen
// }, {
// 	defaultNavigationOptions: defaultStackNavOptions
// });

const MainTabNavigator = createBottomTabNavigator({
	QuoteScreen: {
		screen: QuoteScreen,
		navigationOptions: {
            tabBarLabel: 'Quote of day',
			tabBarIcon: (tabInfo) => { 
				return (<Ionicons name='ios-home' size={25} color={tabInfo.tintColor}/>); 
			}
		}
	},
	FavoritesScreen: {
		screen: FavoritesScreen, 
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: (tabInfo) => { 
				return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>); 
			}
		}}
},{
	tabBarOptions: {
		activeTintColor: Colors.blueMain
	}
});

// const FiltersNavigator = createStackNavigator({
// 	Filters: FiltersScreen
// }, {
// 	navigationOptions: {
// 		drawerLabel: 'Filters'
// 	},
// 	defaultNavigationOptions: defaultStackNavOptions
// });

const MainNavigator = createDrawerNavigator({
    HomeScreen: {screen: MainTabNavigator, navigationOptions: { drawerLabel: 'Home'}},
    AboutScreen: {screen: AboutScreen, navigationOptions: { drawerLabel: 'About'}}
}, {
	contentOptions: {
		activeTintColor: 'blue'
	}
});


export default createAppContainer(MainNavigator);
