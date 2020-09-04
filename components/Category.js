
import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Categories from '../contants/categories';
import Colors from '../contants/colors';

import { filterByCategory } from '../helpers/quoteHelper';

const Category = (props) => {
  const backgroundColor = Categories[props.categoryText]
  var numberOfQuotes = props.categoryText == 'All' ? props.quotes.length : filterByCategory(props.quotes, props.categoryText).length

  return (
    <TouchableOpacity onPress={() => props.onPressHandler(props.categoryText)}>
      <View style={{...style.category, backgroundColor: backgroundColor }}>
        <Text style={style.text}>{`${props.categoryText} (${numberOfQuotes})`}</Text>
      </View>
    </TouchableOpacity>
    );
  }

const style = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  category: {
    height: '60%',
    width: 140,
    margin: 5,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontFamily: 'ibm-plex-light',
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  }
});
export default Category;