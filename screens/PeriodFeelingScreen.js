import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { RADIO_BUTTON_FEELING_PERIOD, RADIO_BUTTON_PERSON } from '../data/data';

import RadioGroup from 'react-native-radio-buttons-group';
import LoadingScreen from '../components/LoadingScreen';
import FeelingContainer from '../components/FeelingContainer';

import URLs from '../contants/urls';
import axios from 'axios';

import * as Animatable from 'react-native-animatable';

const PeriodFeelingScreen = props => {
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)
  const partner = useSelector(state => state.auth.partner)

  const [period, setPeriod] = useState('day');
  const [feeling, setFeeling] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPersonId, setCurrentPersonId] = useState(userId);

  const periodHandler = (period, personId) => {
    setLoading(true)
    
    let selectedButton = period.find(e => e.selected == true);

    axios.get(URLs.base.concat(`/feelings/for_period?user_id=${personId}&period=${selectedButton.value}`), {
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

  const personHandler = (person) => {
    let selectedPerson = person.find(e => e.selected == true);
    let currentPerson = selectedPerson.value == 'me' ? userId : partner.id
    
    setCurrentPersonId(currentPerson)

    periodHandler([{value: period, selected: true }], currentPerson)
  }

  const name = () => {
    return currentPersonId == userId ? 'You were' : `${partner.first_name} was`
  }

  useEffect(() => {
    periodHandler([{value: period, selected: true }], userId)
  }, []);

  if(loading){
    return <LoadingScreen />
  }

  return (
    <View style={styles.screen}>
      <View style={styles.radioButtons}>
        <RadioGroup 
          flexDirection='row' 
          radioButtons={RADIO_BUTTON_PERSON} 
          onPress={(e) => personHandler(e)} 
        />
      </View>
      <View style={styles.radioButtons}>
        <RadioGroup 
          flexDirection='row' 
          radioButtons={RADIO_BUTTON_FEELING_PERIOD} 
          onPress={(e) => periodHandler(e, currentPersonId)} 
        />
      </View>
        <FeelingContainer 
          animation="zoomInUp"
          userFeeling={null} 
          feeling={feeling} 
          text={`Feeling of the ${period}`}
          userId={userId}
        />
        <Animatable.Text animation="zoomInUp" style={styles.buttonText} >{name()} {feeling.name} {count} times in the last {period}</Animatable.Text>
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
  buttonText: {
    textAlign: 'center',
    fontFamily: 'ibm-plex-thin',
    fontSize: 20,
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
