import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList, ImageBackground, TextInput } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, filterByText } from '../helpers/quoteHelper';
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";

import * as quoteActions from '../store/actions/quote';
import HeaderIcon from '../navigation/components/HeaderIcon';
import Colors from '../contants/colors';
import Category from "../components/Category";
import Categories from '../contants/categories';

import * as Animatable from 'react-native-animatable';

const favoriteQuote = (item, props) => {
	const borderColor = Categories[item.item.category]
	return(
		<View style={{...styles.favoriteQuoteContainer, borderBottomColor: borderColor}}>
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
	let [filteredQuotes, setFilteredQuotes] = useState(favoriteQuotes)
	let [filterVisibile, setFilterVisible] = useState(false)
	let [filteredText, setFilteredText] = useState('')

	const dispatch = useDispatch();

	useEffect(() => {
		if(token) {
			dispatch(quoteActions.getFavoriteQuotes());
		}
	}, [token])

	useEffect(() => {
		setFilteredQuotes(favoriteQuotes)
	}, [favoriteQuotes])

	const setFiltersHandler = (categoryFilter) => {
		setFilteredText('')
    const filtered = setFilters(favoriteQuotes, categoryFilter)
    if(filtered.length === 0) {
      showMessage({
				message: 'No filtered quotes with that category',
				type: "info",
			})
		}
    setFilteredQuotes(filtered)
	}
	
	useEffect(() => {
		filteredQuotes = filterByText(favoriteQuotes, filteredText)
		setFilteredQuotes(filteredQuotes)
	}, [filteredText])

	const toggleFilter = useCallback(async () => {
		setFilteredText('')
		setFilterVisible(!filterVisibile)
	}, [filterVisibile]);

	useEffect(() =>{ 
		props.navigation.setParams({ 
			toggleFilter: toggleFilter
		});
	}, [toggleFilter])

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
			<View style={styles.categoryContainer}>
				<ScrollView horizontal  contentContainerStyle={styles.centerScroll}>
					{ Object.keys(Categories).map(category => <Category key={category} quotes={favoriteQuotes} categoryText={category} onPressHandler={setFiltersHandler} /> )}
				</ScrollView>
			</View>
			
			{ filterVisibile > 0 ? (
					<TextInput 
						animation="fadeInUp"
						value={filteredText} 
						style={styles.filterInput} 
						onChangeText={text => setFilteredText(text)} 
						placeholder='Filter by text'
						autoCapitalize='none'	
					/>
				) : (<View></View>)
			}
			
		
			{ filteredQuotes.length > 0 ? (
				<FlatList 
					keyExtractor={item => item.id.toString()}
					data={filteredQuotes}
					renderItem={(item) => favoriteQuote(item, props)}
					contentContainerStyle={styles.list}
				/>) : (
				<View style={styles.centered}>
					<Text style={styles.title}>No quotes here</Text>
				</View>
			)}
		</View>
	);
}

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favorites',
    headerLeft: () => (
      <HeaderIcon icon='ios-menu' onPress={()=> navData.navigation.toggleDrawer()} />
		),
		headerRight: () => (
      <HeaderIcon icon='md-color-filter' onPress={()=> navData.navigation.state.params.toggleFilter()} />
    )
   }
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	centerScroll: {
		justifyContent: 'center', 
		alignItems: 'center',
		flexGrow: 1
	},
	listContainer: {
		height: 400,
	},
	title: {
		fontSize: 20,
		marginVertical: 40,
		textAlign: 'center',
		fontFamily: 'ibm-plex-light'
	},
	favoriteQuoteContainer: {
		padding: 0,
		margin: 0,
		flexGrow: 1,
		width: '100%',
		borderBottomColor: Colors.babyRose,
		borderBottomWidth: 5,
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
		flexGrow: 1
	},
	categoryContainer: {
		height: 80,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: Colors.babyRose,
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
	},
	filterInput: {
		fontFamily: 'ibm-plex-light',
		height: 40,
		width: '100%',
		borderColor: Colors.babyRose,
		borderRadius: 10,
		fontSize: 15,
		margin: 10,
		textAlign: 'center'
	}
})

export default FavoritesScreen;