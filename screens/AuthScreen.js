import React, { useState, useEffect } from "react";
import Colors from '../contants/colors';
import HeaderIcon from '../navigation/components/HeaderIcon';

import { StyleSheet, View, Text, Button, ScrollView, TextInput, ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";

import * as authActions from '../store/actions/auth';
import * as quoteActions from '../store/actions/quote';
import * as feelingActions from '../store/actions/feeling';

const AuthScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const authHandler = () => {
		let action;
    if (isSignup) {
      action = authActions.signUp(email, password)
    } else {
      action = authActions.login(email, password)
		}
		
		setError(null);
		setIsLoading(true)

		dispatch(action)
			.then(response => {
				console.log(response)
				setIsLoading(false);
				dispatch(authActions.setPartner());
      	dispatch(quoteActions.getFavoriteQuotes());
      	// dispatch(feelingActions.getLatestFeelings(3));
      	dispatch(feelingActions.getAllFeelings());
				showMessage({
					message: "Successfully logged in",
					type: "success",
				})
				props.navigation.navigate('HomeScreen')
			}).catch(error => {
				setError(error.message);
				setIsLoading(false);
			})
	}

	useEffect(() => {
    if (error) {
      showMessage({
				message: error,
				type: "danger",
			})
    }
  }, [error]);

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
						<Text style={styles.label}>Email</Text>
						<TextInput
						style={styles.input}
						value={email}
						keyboardType='email-address'
						autoCapitalize='none'
						onChangeText={text => setEmail(text)}
						/>
				</View>
				<View style={styles.formControl}>
						<Text style={styles.label}>Password</Text>
						<TextInput
						style={styles.input}
						value={password}
						secureTextEntry={true}
						onChangeText={text => setPassword(text)}
						/>
				</View>
				{isLoading ? (
						<ActivityIndicator size="small" color={Colors.blueMain} />
					) : (
						<Button
							title={isSignup ? 'Sign Up' : 'Login'}
							color={Colors.blueMain}
							onPress={authHandler}
						/>
					)}
				<View style={styles.buttonContainer}>
					<Button
						title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
						color={Colors.blueLight}
						onPress={() => {
							setIsSignup(prevState => !prevState);
						}}
					/>
				</View>
			</View>
		</ScrollView>
		
		);
}

AuthScreen.navigationOptions = navData => {
  return {
		headerTitle: 'Authenticate',
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
		// fontFamily: 'open-sans-bold',
		marginVertical: 8
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
	buttonContainer: {
		marginTop: 10
	}
});

export default AuthScreen;