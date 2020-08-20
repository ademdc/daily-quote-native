import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../contants/colors';

const GridTile = props => {
	return(
		<TouchableOpacity  
			style={{...styles.renderItem, backgroundColor: props.itemData.item.color}} 
			onPress={()=> { 
				props.navigation.navigate({
					routeName: 'CategoryMeals',
					params: {
						categoryId: props.itemData.item.id
					}
				});
			}}>
			<View>
				<Text style={styles.itemText}> {props.itemData.item.title} </Text>
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	renderItem: {
		flexGrow: 1,
		width: '40%',
		height: 100,
		backgroundColor: Colors.blueLight,
		padding: 10,
		margin: 10,
		color: 'white',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		elevation: 3,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	itemText: {
		color: 'white',
		textAlign: 'right',
		fontWeight: 'bold',
		fontSize: 20
	}
});

export default GridTile;