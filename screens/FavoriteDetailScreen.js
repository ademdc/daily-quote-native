import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { useDispatch } from 'react-redux';
import Separator from '../components/Separator';

const FavoriteDetailScreen = props => {
  const dispatch = useDispatch();
  const quote = props.navigation.getParam('quote')

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.screen}>
        <View style={styles.quoteImageContainer}>
          <Image
            style={styles.quoteImage}
            source={{uri: quote.image_url}}
          />
        </View>
          <View style={styles.masnicaLogoContainer}>
            <Image 
              style={styles.quoteImage}
              source={require('../assets/images/logo.png')}>
            </Image>
          </View>
          
          <View style={styles.quoteTextContainer}>
            <Text style={styles.quoteText}>{quote.text}</Text>
          </View>

          <Separator quote={quote}/>
          
          <View style={{...styles.quoteTextContainer, paddingVertical: 20}}>
            <Text>Daily for date: </Text>
            <Text style={styles.quoteDate}>{quote.daily_for_date}</Text>
          </View>
        
      </View>
    </ScrollView>
    
  );
};

FavoriteDetailScreen.navigationOptions = (navigationData) => {
  const quoteAuthor = navigationData.navigation.getParam('quote').author

  return { 
    headerTitle: quoteAuthor
   }
};

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
    height: 300
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
  quoteDate: {
    textAlign: 'center',
    fontFamily: 'ibm-plex-thin',
    fontSize: 15
  },
  masnicaLogoContainer: {
    height: 100,
    width:  100
  }
});

export default FavoriteDetailScreen;
