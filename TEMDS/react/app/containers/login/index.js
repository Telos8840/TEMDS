/**
 * Created by Saul on 2/19/17.
 */

import React, {Component, PropTypes} from "react";
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from 'react-redux';
import Lock, {LOCK_OPTIONS} from "./../../services/Auth0";
import {signIn, signOut} from './../../reducers/Customer/actions';
import LogoSpinner from "./../../components/LogoSpinner";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';
import Constants from "../../Constants";
import Languages from "../../Languages";
const { width, height } = Dimensions.get("window");

const background = Constants.Image.SplashScreen;

class LoginIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};

		console.log('login', props);
	}

	_onShowLock() {
		this.props.auth.login((err, profile, token) => {
			this.setState({isLoading: true});
			console.log('error ',err);
			console.log('profile ',profile);
			console.log('token ',token);

			this.props.auth.lock.authenticationAPI()
				.userInfo(token.accessToken)
				.then(fullProfile => {
					console.log('profile', fullProfile);
					const _customer = Object.assign({}, fullProfile, {
						avatar_url: fullProfile.picture_large ? fullProfile.picture_large : fullProfile.picture
					});
					this.props.signIn(_customer);
					this.props.auth.setToken(token);
					Actions.home({type: "reset"});
				})
				.catch(error => console.log(error));

















			// if (err != null || profile == null || token == null) {
			// 	alert(JSON.stringify(err));
			// 	this.setState({isLoading: false});
			// } else if (profile.email == null || profile.email_verified == false) {
			// 	if (profile.email == null)
			// 		alert(profile.email_verified ? Languages.CantReactEmailError : Languages.NoEmailError);
			// 	if (profile.email_verified == false && profile.email != null)
			// 		alert(Languages.EmailIsNotVerifiedError);
			// } else {
			//

				// const makeRandomPassword = (length) => {
				// 	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				// 	let text = "";
				// 	for (let i = 0; i < length; i++)
				// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
				// 	return text;
				// };
				//
				// const customerIsExisted = (customer) => {
				// 	console.log('found');
				// 	if (password != undefined) {
				// 		//It's mean this function got call by signup form. Drop.
				// 		alert('This email already exist');
				// 		this.setState({isLoading: false});
				// 	} else {
				// 		const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
				// 		this.props.signIn(_customer);
				// 		if (DBHelper.saveCustomer(customer) != undefined) {
				// 			this.setState({isLoading: false});
				// 			EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
				// 			Actions.home({type: "reset"});
				// 		}
				// 	}
				// };
				//
				// let makeNewCustomer = () => {
				// 	let data = {
				// 		"email": profile.email,
				// 		"first_name": profile.family_name,
				// 		"last_name": profile.given_name,
				// 		"username": profile.email,
				// 		"password": makeRandomPassword(10),
				// 		"avatar_url": profile.picture == undefined ? null : profile.picture,
				// 		"billing": {
				// 			"first_name": profile.family_name,
				// 			"last_name": profile.given_name,
				// 			"email": profile.email,
				// 		},
				// 		"shipping": {
				// 			"first_name": profile.family_name,
				// 			"last_name": profile.given_name,
				// 		}
				// 	};
				//
				// 	WooWorker.createCustomer(data, (customer) => {
				// 		const _customer = Object.assign({}, customer, {avatar_url: profile.picture});
				// 		this.props.signIn(_customer);
				// 		if (DBHelper.saveCustomer(customer) != undefined) {
				// 			this.setState({isLoading: false});
				// 			EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
				// 			Actions.home({type: "reset"});
				// 		}
				// 	});
				// };
				//
				// WooWorker.customerByEmail(profile.email, customerIsExisted, makeNewCustomer)
			//}
		});
	}

	render() {
		if (this.state.isLoading)
			return <LogoSpinner fullStretch/>;

		return (
			<View style={styles.container}>
				<Image source={background} style={styles.background} resizeMode="cover">
					<View style={styles.end}>
						<View style={styles.wrapper}>
							<TouchableOpacity activeOpacity={.5} onPress={() => this._onShowLock() }>
								<View style={styles.button}>
									<Text style={styles.buttonText}>Get Started</Text>
								</View>
							</TouchableOpacity>
						</View>
						{/*<TouchableOpacity activeOpacity={.5}>*/}
						{/*<View>*/}
						{/*<Text style={styles.forgotPasswordText}>Forgot Password?</Text>*/}
						{/*</View>*/}
						{/*</TouchableOpacity>*/}
						{/*<View style={styles.container}>*/}
						{/*<View style={styles.signupWrap}>*/}
						{/*<Text style={styles.accountText}>Don't have an account?</Text>*/}
						{/*<TouchableOpacity activeOpacity={.5}>*/}
						{/*<View>*/}
						{/*<Text style={styles.signupLinkText}>Sign Up</Text>*/}
						{/*</View>*/}
						{/*</TouchableOpacity>*/}
						{/*</View>*/}
						{/*</View>*/}
					</View>

				</Image>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	end: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		height,
	},
	markWrap: {
		flex: 1,
		paddingVertical: 30,
	},
	mark: {
		width: null,
		height: null,
		flex: 1,
	},
	background: {
		width,
		height,
	},
	wrapper: {
		paddingVertical: 60,
	},
	inputWrap: {
		flexDirection: "row",
		marginVertical: 10,
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: "#CCC"
	},
	iconWrap: {
		paddingHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		height: 20,
		width: 20,
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: "transparent",
		paddingVertical: 0,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 26,
	},
	forgotPasswordText: {
		color: "#D8D8D8",
		backgroundColor: "transparent",
		textAlign: "right",
		paddingRight: 15,
	},
	signupWrap: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	accountText: {
		color: "#D8D8D8"
	},
	signupLinkText: {
		color: "#FFF",
		marginLeft: 5,
	}
});

const mapStateToProps = (state) => {
	return {
		customer: state.Customer,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (customer) => {
			dispatch(signIn(customer));
		},
		signOut: () => {
			dispatch(signOut());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginIn);