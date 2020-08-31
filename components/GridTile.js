import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../contants/colors';
import { showMessage } from "react-native-flash-message";
import * as feelingActions from '../store/actions/feeling';
import { useDispatch, useSelector } from 'react-redux';

const GridTile = props => {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.userId)

	const feelingHandler = (feeling_id) => {
		try {
			dispatch(feelingActions.setNewLatestFeeling(feeling_id))
			dispatch(feelingActions.getLatestFeelings(userId))
      showMessage({
        message: "You changed your mood",
        type: "success",
      })
    } catch(error) {
			console.log(error)
		}
		
		props.navigation.navigate({
			routeName: 'Feeling',
			params: {
				feeling: props.itemData.title
			}
		});
	}

	return(
		<TouchableOpacity  
			style={{...styles.renderItem, backgroundColor: props.itemData.item.color}} 
			onPress={() => feelingHandler(props.itemData.item.id)}>
			<View>
				<Text style={styles.itemText}> {props.itemData.item.name} </Text>
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