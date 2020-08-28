import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { RADIO_BUTTON_FEELING_PERIOD } from '../data/data';

import RadioGroup from 'react-native-radio-buttons-group';
import LoadingScreen from '../components/LoadingScreen';
import FeelingContainer from '../components/FeelingContainer';

import URLs from '../contants/urls';
import axios from 'axios';


const PeriodFeelingScreen = props => {
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)
  const [period, setPeriod] = useState('day');
  const [feeling, setFeeling] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const periodHandler = (period) => {
    setLoading(true)

    let selectedButton = period.find(e => e.selected == true);
    axios.get(URLs.base.concat(`/feelings/for_period?user_id=${userId}&period=${selectedButton.value}`), {
			headers: {
				Authorization: 'Bearer ' + token
			}})
			.then(feelingResponse => {
        setPeriod(selectedButton.value)
        setFeeling(feelingResponse.data.feeling)
        setCount(feelingResponse.data.count)
			})
			.catch(error => {
				console.log(error)
      })
      .finally(() => {
        setLoading(false)
      });
  }

  useEffect(() => {
    periodHandler([{value: 'day', selected: true }])
  }, []);

  if(loading){
    return <LoadingScreen />
  }

  return (
    <View style={styles.screen}>
      <View style={styles.radioButtons}>
        <RadioGroup 
          flexDirection='row' 
          radioButtons={RADIO_BUTTON_FEELING_PERIOD} 
          onPress={(e) => periodHandler(e)} 
        />
      </View>
        <FeelingContainer 
          userFeeling={null} 
          feeling={feeling} 
          text={`Feeling of the ${period}`}
          userId={userId}
        />

        <Text>You were {feeling.name} {count} times in the last {period}</Text>
		</View>
  );
};

PeriodFeelingScreen.navigationOptions = (navigationData) => {
  return { 
    headerTitle: 'Feeling for period'
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
  },
  radioButtons: {
    paddingVertical: 15
  }
});

export default PeriodFeelingScreen;
