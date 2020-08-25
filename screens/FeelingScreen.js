import React, { useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as feelingActions from '../store/actions/feeling';


const FeelingScreen = props => {
  const dispatch = useDispatch();
  const partnerFeeling = useSelector(state => state.feeling.partnerFeeling)
  const latestFeeling = useSelector(state => state.feeling.latestFeeling)
  const userId = useSelector(state => state.auth.userId)
  const partner = useSelector(state => state.auth.partner)

  useEffect(() => {
    //getLatestFeeling()
  }, []);

  return (
    <View style={styles.screen}>
			<Text>Feeling screen</Text>
        <Text>Your are feeling {latestFeeling.name}</Text>
        <Text>Your partner {partner.first_name} is feeling {partnerFeeling.name}</Text>
        
      <TouchableOpacity  
        style={{}} 
        onPress={()=> { 
          props.navigation.navigate({
            routeName: 'FeelingDetail',
            params: {
              feeling: 'Title'
            }
          });
        }}>
        <View>
          <Text style={{}}> How do you feel now? </Text>
        </View>
      </TouchableOpacity>
		</View>
  );
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

export default FeelingScreen;
