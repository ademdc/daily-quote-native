import React, { useState, useEffect, Fragment, useRef } from "react";
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";
import axios from 'axios';
import URLs from '../contants/urls';

function useQuote() {
  const [quote, setQuote] = useState(null)
  const previousQuoteIndex = useRef(-1)
  
  useEffect(() => {
    updateQuote()
  }, [])

  function updateQuote() {
    axios.get(URLs.testBase.concat('/quotes'))
      .then(quotes => {
        let randomIndex = Math.floor(Math.random() * quotes.data.length);

        while(randomIndex == previousQuoteIndex.current) {
          randomIndex = Math.floor(Math.random() * quotes.data.length)
        }

        previousQuoteIndex.current = randomIndex;

        setQuote(quotes.data[randomIndex])
      })
      .catch(error => {
        console.log(error)
    });
  }
  imageUrl = quote ? quote.image_url : URLs.customImage
  return { quote, updateQuote, imageUrl }
}
const QuoteScreen = (props) => {
  const { quote, updateQuote, imageUrl } = useQuote()
	console.log(props.navigation)
  return (
    <View style={styles.quoteContainer}>
      <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={{uri: imageUrl}}
            resizeMode="cover" 
          />
        </View>
				{/* <Button title='Toggle drawer' onPress={()=> {props.navigation.toggleDrawer()}}/> */}
        <Text style={styles.header}>{"Mašnica daily quote".toUpperCase()}</Text>
        <View style={styles.logoImageContainer}>
          <Image 
            style={styles.image} 
            source={require("../assets/images/logo.png")}
            resizeMode="cover" 
          />
        </View>
  
    <ScrollView contentContainerStyle={styles.quoteContainer}>
      {quote && (
        <Fragment>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
          <Button onPress={updateQuote} syle={styles.button} title="Next quote" />
        </Fragment>
      )}
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    height: '100%'
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  header: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 40
  },
  quoteText: {
    textAlign: "center",
    fontSize: 24,
    fontStyle: 'italic',
    paddingHorizontal: 10
  },
  quoteAuthor: {
    fontSize: 18,
    marginTop: 25
  },
  logoImageContainer: {
		width: 100,
		height: 100,
		overflow: 'hidden',
		marginVertical: 20
	},
  imageContainer: {
		width: '100%',
		height: 200,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
  },
  button: {
    marginVertical: 30
  }
})

export default QuoteScreen;