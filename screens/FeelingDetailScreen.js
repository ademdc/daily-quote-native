import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import GridTile from '../components/GridTile';

const FeelingDetailScreen = props => {
  const dispatch = useDispatch();
  const allFeelings = useSelector(state => state.feeling.allFeelings)
  
  useEffect(() => {
    
  }, [dispatch]);

  return (
    <View style={styles.screen}>
			<FlatList 
				data={allFeelings} 
				numColumns={2}
				renderItem={(itemData) => <GridTile navigation={props.navigation} itemData={itemData} />}
			/>
		</View>
  );
};

FeelingDetailScreen.navigationOptions = (navigationData) => {
  return { 
    headerTitle: 'How do you feel now?'
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
