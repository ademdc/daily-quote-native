import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import MainTabNavigator from '../tab/MainTabNavigator';
import AboutScreen from '../../screens/AboutScreen';
import AuthScreen from '../../screens/AuthScreen';

import Colors from '../../contants/colors';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

let drawerItems = {
	HomeScreen:  {screen: MainTabNavigator, navigationOptions: { drawerLabel: 'Home'}},
	AboutScreen: {screen: AboutScreen, navigationOptions: { drawerLabel: 'About'}},
	AuthScreen:  {screen: AuthScreen, navigationOptions: { drawerLabel: 'Authenticate'}}
}

const MainDrawerNavigator = createDrawerNavigator(
	drawerItems,
	{
		contentOptions: {
			activeTintColor: Colors.blueMain
		},
		contentComponent: props => {
			const dispatch = useDispatch();
			const token = useSelector(state => !!state.auth.token)
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
              { token ? (
                <TouchableOpacity onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.toggleDrawer();
                  props.navigation.navigate('AuthScreen');
                }}>
                  <Text style={styles.drawerItem}>Logout</Text>
                </TouchableOpacity>
              
              ): (
                <TouchableOpacity onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.toggleDrawer();
                  props.navigation.navigate('AuthScreen');
                }}>
                  <Text style={styles.drawerItem}>Login/Sign Up</Text>
                </TouchableOpacity>
              ) }
						
					</SafeAreaView>
        </View >
      );
    }
  }
);

const styles = StyleSheet.create({
  drawerItem: {
    fontSize: 15,
    color: Colors.blueMain,
    paddingLeft: 15,
    fontWeight: 'bold',
    paddingTop: 30
  },
  customItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
});
export default MainDrawerNavigator;