import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import MainTabNavigator from '../tab/MainTabNavigator';
import NullComponent from '../components/NullComponent';
import AuthStackScreen from '../stack/AuthStackNavigator';

import Colors from '../../contants/colors';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { Ionicons } from '@expo/vector-icons';

const homeText = () => {
  return(<Text style={styles.drawerItem}><Ionicons name='ios-home' size={20}/>   Home </Text>)
}

const loginText = (text) => {
  return(<Text style={styles.drawerItem}><Ionicons name='ios-log-in' size={20}/>   {text}</Text>)

}

let drawerItems = {
  HomeScreen:  {screen: MainTabNavigator, navigationOptions: { drawerLabel: homeText}},
  AuthScreen:  {screen: AuthStackScreen, navigationOptions: { drawerLabel: NullComponent}}
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
                  {loginText('Log out')}
                </TouchableOpacity>
              
              ): (
                <TouchableOpacity onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.toggleDrawer();
                  props.navigation.navigate('AuthScreen');
                }}>
                  {loginText('Log in/Sign up')}
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
    fontSize: 14,
    color: 'black',
    paddingLeft: 17,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  customItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
});
export default MainDrawerNavigator;