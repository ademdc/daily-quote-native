import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const LogoutScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();

	const signInHandler = () => {
		dispatch(authActions.login(email, password))
	}

	return (
		<ScrollView>
			<Text style={styles.header} > Log In </Text>
			<View style={styles.form}>
				<View style={styles.formControl}>
						<Text style={styles.label}>Email</Text>
						<TextInput
						style={styles.input}
						value={email}
						onChangeText={text => setEmail(text)}
						/>
				</View>
				<View style={styles.formControl}>
						<Text style={styles.label}>Password</Text>
						<TextInput
						style={styles.input}
						value={password}
						onChangeText={text => setPassword(text)}
						/>
				</View>
				<Button title='Log in' onPress={()=> signInHandler()}/>
				<Text> {token ? token : "no token"}</Text>
			</View>
		</ScrollView>
		
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	form: {
		margin: 20
	},
	header: {
			fontSize: 30,
			textAlign: 'center',
			marginVertical: 30
	},
	formControl: {
		width: '100%'
	},
	label: {
		marginVertical: 8
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	}
});

export default LogoutScreen;