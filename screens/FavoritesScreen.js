import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as quoteActions from '../store/actions/quote';
import HeaderIcon from '../navigation/components/HeaderIcon';
import Colors from '../contants/colors';

const favoriteQuote = (item, props) => {
	return(
		<View style={styles.favoriteQuoteContainer}>
		<TouchableOpacity onPress={()=> props.navigation.navigate({
			routeName: 'FavoriteDetailScreen',
			params: {
				quote: item.item
			}
		})}>
			<ImageBackground style={styles.favQuoteImage} source={{uri: item.item.image_url}}>
				<Text style={styles.author}>{item.item.author}</Text>
				<View style={styles.quoteTextContainer}>
					<Text style={styles.quoteText}>{item.item.text}</Text>
				</View>			
			</ImageBackground>
		</TouchableOpacity>
		</View>

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
			<View style={styles.centered}>
				<Text style={styles.title} >Login to see your favorite quotes.</Text>
				<Button title='Login' color={Colors.blueMain} onPress={()=> props.navigation.navigate('AuthScreen')}></Button>
			</View>
		)
	}
	return (
		<View style={styles.centered}>
			{favoriteQuotes.length > 0 ? (
				<FlatList 
					keyExtractor={item => item.id.toString()}
					data={favoriteQuotes}
					renderItem={(item) => favoriteQuote(item, props)}
					contentContainerStyle={styles.list}
				/>) : (
					<Text style={styles.title}>No favorite quotes added yet.</Text>
			)}
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
		marginVertical: 40,
		fontFamily: 'ibm-plex-light'
	},
	favoriteQuoteContainer: {
		padding: 0,
		margin: 0,
		flexGrow: 1,
		width: '100%',
		borderBottomColor: Colors.babyRose,
		borderBottomWidth: 3,
	},
	favQuoteImageContainer: {
		height: 100,
		width: '100%',
		overflow: 'hidden'
	},
	favQuoteImage: {
		width: 400,
		height: 200,
		justifyContent: 'flex-end',
	},
	author: {
		color: 'white',
		width:100,
		fontFamily: 'ibm-plex-thin',
		fontSize: 20
		// backgroundColor: 'white'
	},
	quoteTextContainer: {
		backgroundColor: 'rgba(255,255,255,0.7)'
	},
	quoteText: {
		fontFamily: 'ibm-plex-light',
		fontSize: 17,
		color: 'black',
		padding: 5
	},
	list: {
		// width: '100%'
		flexGrow: 1
		// alignItems: 'center',
		// justifyContent: 'center'
	}
})

export default FavoritesScreen;