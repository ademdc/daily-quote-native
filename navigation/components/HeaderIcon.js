import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../contants/colors';
 
const HeaderIcon = (props) => {
  return(
    <View style={{marginLeft: 15}}>
      <TouchableOpacity onPress={props.onPress}>
        <Ionicons name={props.icon} size={25} color={Colors.blueMain}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default HeaderIcon;
