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
import * as feelingActions from '../store/actions/feeling';

const FeelingContainer = (props) => {
  const dispatch = useDispatch();
  const userFeeling = useSelector(state => state.feeling.userFeeling)

  const getFeelingTime = (feeling) => {
    var date = new Date(feeling.created_at).toString().split('GMT')[0]
    showMessage({
      message: date,
      type: "info",
    })
  } 

  const getFeelingDetails = (feeling) => {
    dispatch(feelingActions.getUserFeelings(feeling.id, props.userId))

    showMessage({
      message: `There are ${(userFeeling || []).length} ${feeling.name} feelings in the last month for that user.`,
      type: "info",
    })
  }

  if(!props.feeling && !props.userFeeling) {
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
          <Text style={styles.feeling}>{(props.feeling || {}).name.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feelingImageContainer}>
      <TouchableOpacity onPress={() => getFeelingTime(props.userFeeling)}>
        <Image style={styles.feelingImage} source={{uri: props.feeling.image}}></Image>
      </TouchableOpacity>
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
  feelingContainer: {
    padding: 20,
    flex: 1,
    width: '100%',
    height: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    borderLeftWidth: 5,
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
    fontSize: 50,
    fontStyle: 'normal',
    fontFamily: 'ibm-plex-light'
  }
});
export default FeelingContainer;