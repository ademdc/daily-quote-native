import React from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { showMessage } from "react-native-flash-message";

const FeelingContainer = (props) => {

  const getFeelingDetails = (feeling) => {
    var date = new Date(feeling.created_at)
    showMessage({
      message: date.toString(),
      type: "info",
    })
  }

	return (
    <View style={styles.feelingContainer}>
      <View style={{...styles.textContainer, borderLeftColor: props.feeling.color }}>
        <Text style={styles.feelingText}> {props.text}</Text>
        <Text style={styles.feeling}>{(props.feeling || {}).name.toUpperCase()}</Text>
      </View>
      <View style={styles.feelingImageContainer}>
      <TouchableOpacity onPress={() => getFeelingDetails(props.userFeeling)}>
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