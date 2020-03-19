import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput, ActivityIndicator} from "react-native";
import * as authActions from '../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import Colors from '../contants/colors';

const AuthScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();

	const authHandler = () => {
		let action;
    if (isSignup) {
			console.log('is signup')
      action = authActions.signUp(email, password)
    } else {
			console.log('is signin')
      action = authActions.login(email, password)
		}
		
		setError(null);
		setIsLoading(true)

		dispatch(action)
			.then(response => {
				console.log(response)
				setIsLoading(false);
				showMessage({
					message: "Successfully logged in",
					type: "success",
				})
				props.navigation.navigate('HomeScreen')
			}).catch(error => {
				console.log('IN CATCH OF DISPATCH auth actions')
				setError(error.message);
				console.log(error.message)
				setIsLoading(false);
			})
		
	}

	useEffect(() => {
		console.log('in use effect of error change')
    if (error) {
      showMessage({
				message: error,
				type: "danger",
			})
    }
  }, [error]);

	return (
		<ScrollView>
			<Text style={styles.header} > Authenticate </Text>
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