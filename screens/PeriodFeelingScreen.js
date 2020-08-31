import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  VirtualizedList
} from 'react-native';

import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { RADIO_BUTTON_FEELING_PERIOD, RADIO_BUTTON_PERSON } from '../data/data';

import RadioGroup from 'react-native-radio-buttons-group';
import LoadingScreen from '../components/LoadingScreen';
import FeelingContainer from '../components/FeelingContainer';
import HeaderIcon from '../navigation/components/HeaderIcon';

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
  const [modalVisible, setModalVisible] = useState(true);

  const periodHandler = (period, personId) => {
    setLoading(true)
    setModalVisible(!modalVisible)
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

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible)
  }, [modalVisible]);

  useEffect(() => {
    props.navigation.setParams({ toggle: toggleModal });
  }, [toggleModal]);

  const feelingDetailText = () => {
    const initial = currentPersonId == userId ? 'You were' : `${partner.first_name} was`

    if(feeling){
      return `${initial} ${feeling.name.toLowerCase()} ${count} times in the last ${period}`
    }else{
      return `No feeling for the ${period}`
    }

  }

  useEffect(() => {
    periodHandler([{value: period, selected: true }], userId)
  }, []);

  if(loading){
    return <LoadingScreen />
  }

  return (
    <View style={styles.screen} >
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={styles.modalScreen}>
          <Text style={styles.filterTitle}>Person:</Text>
          <View style={styles.radioButtons}>
            <RadioGroup 
              flexDirection='row' 
              radioButtons={RADIO_BUTTON_PERSON} 
              onPress={(e) => personHandler(e)} 
            />
          </View>
          <Text style={styles.filterTitle}>Period:</Text>
          <View style={styles.radioButtons}>
            <RadioGroup 
              flexDirection='row' 
              radioButtons={RADIO_BUTTON_FEELING_PERIOD} 
              onPress={(e) => periodHandler(e, currentPersonId)} 
            />
          </View>
          <TouchableOpacity  
            style={{ padding: 20 }} 
            onPress={toggleModal}>
            <Text style={styles.feelingText}> Close </Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <FeelingContainer 
        animation="zoomInUp"
        userFeeling={null} 
        feeling={feeling} 
        text={`Feeling of the ${period}`}
        userId={userId}
      />
      <Animatable.Text animation="zoomInUp" style={styles.buttonText} >{feelingDetailText()}</Animatable.Text>
		</View>
  );
};

PeriodFeelingScreen.navigationOptions = (navigationData) => {
  return { 
    headerTitle: 'Feeling for period',
    headerRight: () => (
      <HeaderIcon icon='ios-settings' onPress={()=> navigationData.navigation.state.params.toggle() } />
    )
   }
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#6BF7F6',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  modalScreen: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: 15,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  masnicaLogoContainer: {
    height: 100,
    width:  100
  },
  radioButtons: {
    paddingVertical: 15
  },
  feelingText: {
    paddingVertical: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  filterTitle: {
    fontWeight: 'bold'
  }
});

export default PeriodFeelingScreen;
