import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";
import Constants from 'expo-constants';
import HeaderIcon from '../navigation/components/HeaderIcon';
import LoadingScreen from '../components/LoadingScreen';
import MasnicaImageBackground from '../components/MasnicaImageBackground';
// import UpdateNotificationModal from '../components/UpdateNotificationModal';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, AsyncStorage, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";

import * as quoteActions from '../store/actions/quote';
import * as authActions from '../store/actions/auth';
import * as Permissions from 'expo-permissions';

const isInFavorites = (allQuotes, quote) => {
  if (!allQuotes) return false
  return allQuotes.map(q => q.text).includes((quote || {}).text)
}

const QuoteScreen = (props) => {
  const quote = useSelector(state => state.quote.quote)
  const token = useSelector(state => state.auth.token)
  const pushToken = useSelector(state => state.auth.pushToken)
  const favoriteQuotes = useSelector(state => state.quote.favoriteQuotes)

  const dispatch = useDispatch();
  
  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      if (token){
        let newPushToken = await Notifications.getExpoPushTokenAsync();
        await dispatch(authActions.setPushToken(newPushToken))
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  },[token, pushToken]);

  useEffect(() => {
    registerForPushNotificationsAsync()
  },[registerForPushNotificationsAsync]);

	const randomQuoteHandler = useCallback(() => {
		dispatch(quoteActions.getRandomQuote());
  }, [quote])



  useEffect(() => {
    randomQuoteHandler()
  }, []);

  const setFavoriteQuoteHandler = useCallback(() => {
    if(!token) return;

    if(isInFavorites(favoriteQuotes, quote)){
      showMessage({
        message: "Quote is already in favorites",
        type: "info",
      })
      return
    }

    try {
      dispatch(quoteActions.setFavoriteQuote(quote))
      showMessage({
        message: "Quote was added to favorites",
        type: "success",
      })
    } catch(error) {
    }
    
  }, [favoriteQuotes]);

  useEffect(() => {
    if(favoriteQuotes){
      props.navigation.setParams({ 
        setAsFavorite: setFavoriteQuoteHandler,
        favorites: favoriteQuotes,
        quote: quote
      });
    }
    
  }, [setFavoriteQuoteHandler]);

	if (!quote) {
		return (
      <LoadingScreen />
			);
	} 

  return (
    <View style={styles.container} key={Math.random()}>
      <MasnicaImageBackground opacity={0.4}>
        <ScrollView horizontal={false} contentContainerStyle={styles.quoteContainer}>
          <Fragment>
            <Text style={styles.quoteText}>{quote.text}</Text>
            <Text style={styles.quoteAuthor}>{quote.author}</Text> 
          </Fragment>
          {/* {token && (<TouchableOpacity style={styles.likeQuoteContainer} onPress={setFavoriteQuoteHandler}>
            { isInFavorites(favoriteQuotes, quote) ? 
              (<Ionicons name='ios-heart' size={50} color='white'/>) : 
              (<Ionicons name='ios-heart-empty' size={50} color='white'/>)
            }          
          </TouchableOpacity>)} */}
          
        </ScrollView>
      </MasnicaImageBackground>
    </View>
  )
}

QuoteScreen.navigationOptions = navData => {
  let favs  = navData.navigation.getParam('favorites');
  let quote = navData.navigation.getParam('quote');
  let icon  = isInFavorites(favs,  quote) ? 'ios-heart' : 'ios-heart-empty';

  return {
    headerTitle: 'Mašnica Daily Quote',
    headerLeft: () => (
      <HeaderIcon icon='ios-menu' onPress={() => navData.navigation.toggleDrawer()}/>
    ),
    headerRight: () => (
      <HeaderIcon icon={icon} onPress={() => navData.navigation.state.params.setAsFavorite() }/>
    )
   }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    height: '100%'
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  quoteText: {
    textAlign: "center",
    fontSize: 35,
    fontStyle: 'normal',
    paddingHorizontal: 20,
    fontFamily: 'ibm-plex-light'
  },
  quoteAuthor: {
    fontSize: 18,
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'ibm-plex-thin'
  },
  logoImageContainer: {
		width: 100,
		height: 100,
		overflow: 'hidden',
		marginVertical: 20
	},
	image: {
		width: '100%',
		height: '100%',
  },
  imageBg: {
		height: '100%',
		width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeQuoteContainer: {
    marginTop: 50
  }
})

export default QuoteScreen;