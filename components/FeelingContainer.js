import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { showMessage } from "react-native-flash-message";
import URLs from '../contants/urls';
import axios from 'axios';

import * as Animatable from 'react-native-animatable';


const FeelingContainer = (props) => {
  const token = useSelector(state => state.auth.token)

  const getFeelingTime = (feeling) => {
    if (!feeling) return 

    var date = new Date(feeling.created_at).toString().split('GMT')[0]
    showMessage({
      message: date,
      type: "info",
    })
  } 

  const getFeelingDetails = (feeling) => {
    if (!feeling || !props.userFeeling) return 
    
    axios.get(URLs.base.concat(`/feelings/user_feeling?user_id=${props.userFeeling.user_id}&feeling_id=${feeling.id}`), {
			headers: {
				Authorization: 'Bearer ' + token
			}})
			.then(feelingResponse => {
        showMessage({
          message: `There are ${(feelingResponse.data || []).length} ${feeling.name} feelings in the last week for that user.`,
          type: "info",
        })
			})
			.catch(error => {
				console.log(error)
		});
  }
  
  const toUpper = (text) => {
    if (!text) return ''

    return text.toUpperCase()
  }
  if(!props.feeling) {
    return(
      <View style={styles.feelingContainer}>
        <View style={{...styles.textContainer }}>
          <Text style={styles.feelingText}>No feelings yet...</Text>
        </View>
      </View>
    )
  }

	return (
    <View style={styles.feelingContainer}>
      <View style={{...styles.textContainer, borderLeftColor: props.feeling.color }}>
        <Text style={styles.feelingText}> {props.text}</Text>
        <TouchableOpacity onPress={() => getFeelingDetails(props.feeling)}>
          <Animatable.Text style={styles.feeling}>{toUpper((props.feeling || {}).name)}</Animatable.Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feelingImageContainer}>
        <TouchableOpacity onPress={() => getFeelingTime(props.userFeeling)}>
          <Animatable.Image animation="pulse" easing="ease-out" iterationCount={20} style={styles.feelingImage} source={{uri: props.feeling.image}}></Animatable.Image>
        </TouchableOpacity>
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
  feelingContainer: {
    padding: 20,
    flex: 1,
    width: 370,
    height: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  textContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    borderLeftWidth: 7,
    paddingLeft: 10
  },
  feelingImageContainer: {
    width: 100,
    height: 100
  },
  feelingImage: {
    width: '100%',
    height: '100%'
  },
  feelingText: {
    fontSize: 15,
    fontStyle: 'normal',
    fontFamily: 'ibm-plex-light'
  },
  feeling: {
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'ibm-plex-light'
  }
});
export default FeelingContainer;