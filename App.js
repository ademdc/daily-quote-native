import React, { useState, useEffect, Fragment, useRef } from "react";
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";
import AppNavigator from './navigation/AppNavigator';
// import QuoteScreen from './screens/QuoteScreen';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import quoteReducer from './store/reducers/quote';
import { Provider } from 'react-redux';


const rootReducer = combineReducers({
  quote: quoteReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    height: '100%'
  }
})