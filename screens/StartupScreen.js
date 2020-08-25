import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { useDispatch } from 'react-redux';

import Colors from '../contants/colors';
import * as authActions from '../store/actions/auth';
import * as quoteActions from '../store/actions/quote';
import * as feelingActions from '../store/actions/feeling';


const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('AuthScreen');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
 

      props.navigation.navigate('MainDrawerNavigator');
      dispatch(authActions.authenticate(userId, token));
      dispatch(authActions.setPartner());
      dispatch(quoteActions.getFavoriteQuotes());
      dispatch(feelingActions.getLatestFeelings(userId));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
