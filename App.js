import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import axios from 'axios';

function useQuote() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    updateQuote()
  }, [])

  function updateQuote() {
    axios.get('https://065fd157.ngrok.io/quotes')
      .then(quotes => {
        console.log(quotes.data[0])
        const randomIndex = Math.floor(Math.random() * quotes.data.length)
        setQuote(quotes.data[randomIndex])
      })
      .catch(error => {
        console.log(error)
    })
  }
  return { quote, updateQuote }
}
export default function App() {
  const { quote, updateQuote } = useQuote()

  return (
    <View style={styles.container}>
      {quote && (
        <Fragment>
          <Text style={styles.quoteText}>{quote.title}</Text>
          <Text style={styles.quoteAuthor}>{quote.quote}</Text>
          <Button onPress={updateQuote} title="Show Me Another Quote!" />
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25
  },
  quoteText: {
    textAlign: "center",
    fontSize: 28
  },
  quoteAuthor: {
    fontSize: 18,
    marginTop: 25
  }
})