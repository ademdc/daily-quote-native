import React, { useState, useEffect, Fragment, useRef } from "react";
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";
import AppNavigator from './navigation/AppNavigator';
// import QuoteScreen from './screens/QuoteScreen';

export default function App() {
  return (
    <AppNavigator />
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