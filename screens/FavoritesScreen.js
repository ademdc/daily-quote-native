import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as quoteActions from '../store/actions/quote';


const favoriteQuote = (item) => {
	return(
		<TouchableOpacity>
			<View style={styles.favoriteQuoteContainer}>
				<Text>{item.item.text}</Text>
			</View>
		</TouchableOpacity>

	);
}
const FavoritesScreen = (props) => {
	let token = useSelector(state => state.auth.token)
	let favoriteQuotes = useSelector(state => state.quote.favoriteQuotes)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(quoteActions.getFavoriteQuotes());
	}, [token])

	if (!token) {
		return (
			<View style={styles.container}>
				<Text style={{...styles.title, fontStyle: 'italic'}} >Login to see your favorite quotes.</Text>
				<Button title='Login' onPress={()=> props.navigation.navigate('AuthScreen')}></Button>
			</View>
		)
	}
	return (
		<View style={styles.centered}>
			<Text style={styles.title}>Favorites screen</Text>
			<View style={styles.listContainer}>
				<FlatList
					keyExtractor={item => item.text}
					data={favoriteQuotes}
					renderItem={favoriteQuote}
				/>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listContainer: {
		height: 400,
	},
	title: {
		fontSize: 25,
		marginVertical: 40
	},
	favoriteQuoteContainer: {
		padding: 20,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	}
})

export default FavoritesScreen;