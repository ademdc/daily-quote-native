import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { useDispatch } from 'react-redux';

const FeelingDetailScreen = props => {
  const dispatch = useDispatch();
  const feeling = props.navigation.getParam('feeling')

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.screen}>
        <Text>Feeling details for {feeling}</Text>
      </View>
    </ScrollView>
    
  );
};

// FeelingDetailScreen.navigationOptions = (navigationData) => {
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

export default FeelingDetailScreen;
