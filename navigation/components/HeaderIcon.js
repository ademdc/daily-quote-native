import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../contants/colors';

const HeaderIcon = (props) => {
  return(
    <View style={{...styles.iconContainer, ...props.style}}>
      <TouchableOpacity onPress={props.onPress}>
        <Ionicons name={props.icon} size={25} color='white'/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 15
  }
});

export default HeaderIcon;
