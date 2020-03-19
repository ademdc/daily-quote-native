import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as quoteActions from '../store/actions/quote';
import HeaderIcon from '../navigation/components/HeaderIcon';

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
		if(token) {
			dispatch(quoteActions.getFavoriteQuotes());
		}
	}, [token])

	if (!token) {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Login to see your favorite quotes.</Text>
				<Button title='Login' onPress={()=> props.navigation.navigate('AuthScreen')}></Button>
			</View>
		)
	}
	return (
		<View style={styles.centered}>
			<View style={styles.listContainer}>
				{favoriteQuotes.lenght > 0 ? (<FlatList
					keyExtractor={item => item.text}
					data={favoriteQuotes}
					renderItem={favoriteQuote}
				/>) : (
					<Text style={style.title}>No favorite quotes added yet.</Text>
				)}
				
			</View>

		</View>
	);
}

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favorites',
    headerLeft: () => (
      <HeaderIcon icon='ios-menu' onPress={()=>navData.navigation.toggleDrawer()}/>
    )
   }
};

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
		fontSize: 20,
		marginVertical: 40
	},
	favoriteQuoteContainer: {
		padding: 20,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	}
})

export default FavoritesScreen;