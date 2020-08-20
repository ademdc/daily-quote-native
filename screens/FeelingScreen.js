import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { useDispatch } from 'react-redux';

const FeelingScreen = props => {
  const dispatch = useDispatch();
  // const quote = props.navigation.getParam('quote')

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <View>
      <Text>Feeling screen</Text>
    </View>
  );
};

// FeelingScreen.navigationOptions = (navigationData) => {
//   const quoteAuthor = navigationData.navigation.getParam('quote').author

//   return { 
//     headerTitle: quoteAuthor
//    }
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  quoteTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  quoteImageContainer: {
    width: '100%',
    height: 200
  },
  quoteImage: {
    width: '100%',
    height: '100%'
  },
  quoteAuthor: {

  },
  quoteText: {
    textAlign: 'center',
    fontFamily: 'ibm-plex-thin',
    fontSize: 30,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  masnicaLogoContainer: {
    height: 100,
    width:  100
  }
});

export default FeelingScreen;
