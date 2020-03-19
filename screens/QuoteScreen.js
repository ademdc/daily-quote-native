import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as quoteActions from '../store/actions/quote';
import * as authActions from '../store/actions/auth';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import HeaderIcon from '../navigation/components/HeaderIcon';

const QuoteScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const allQuotes = useSelector(state => state.quote.quotes)
  const quote = useSelector(state => state.quote.quote)
  const token = useSelector(state => state.auth.token)
  const pushToken = useSelector(state => state.auth.pushToken)
	
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
        console.log(newPushToken);
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
  
	if (!quote) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size='large' />
			</View>
			);
	} 

  return (
    <View style={styles.quoteContainer}>
      <ImageBackground imageStyle= {{opacity:0.4}} style={styles.imageBg} source={{uri: quote.image_url}}>

        <ScrollView horizontal={false} contentContainerStyle={styles.quoteContainer}>
          {quote && (
            <Fragment>
              <Text style={styles.quoteText}>{quote.text}</Text>
              <Text style={styles.quoteAuthor}>{quote.author}</Text>
              
            </Fragment>
          )}
          {/* <Button onPress={() => randomQuotesHandler(allQuotes)} syle={styles.button} title="Next quote" /> */}

        </ScrollView>
      </ImageBackground>
    </View>
  )

}

QuoteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Mašnica daily quote',
    headerLeft: () => (
      <HeaderIcon icon='ios-menu' onPress={()=>navData.navigation.toggleDrawer()}/>
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
  header: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 40
  },
  quoteText: {
    textAlign: "center",
    fontSize: 35,
    fontStyle: 'normal',
    paddingHorizontal: 20
  },
  quoteAuthor: {
    fontSize: 18,
    marginTop: 25,
    textAlign: 'center'
  },
  logoImageContainer: {
		width: 100,
		height: 100,
		overflow: 'hidden',
		marginVertical: 20
	},
  imageContainer: {
		width: '100%',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
  },
  button: {
    marginVertical: 30
  },
  imageBg: {
		height: '100%',
		width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
	},
})

export default QuoteScreen;