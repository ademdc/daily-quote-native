import React, { useState, useEffect, Fragment, useRef } from "react";
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import store from './store/store';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'ibm-plex-light': require('./assets/fonts/IBMPlexSans-Light.ttf'),
    'ibm-plex-regular': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
    'ibm-plex-thin': require('./assets/fonts/IBMPlexSans-Thin.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
      <FlashMessage position="top" />
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