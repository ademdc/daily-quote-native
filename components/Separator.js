
import React from 'react';
import Colors from '../contants/colors';

import {
  View,
  StyleSheet
} from 'react-native';

const CATEGORY_COLORS = {
	'Love': Colors.lightRed,
	'Traveling': Colors.blueLight,
	'Motivational': Colors.lightGreen,
	'Religion': Colors.darkGreen
}

const Separator = (props) => {

  const getBorderColor = () => {
    return CATEGORY_COLORS[props.quote.category]
  }

  return (
    <View
      style={{ ...styles.separator, borderBottomColor: getBorderColor(), ...props.custom_style }}
    />
    );
  }

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 4,
    width: 350,
    paddingTop: 20,
    borderRadius: 5,
    opacity: 0.8
  }
});

export default Separator;