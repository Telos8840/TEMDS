/**
 * Created by Luan on 11/7/2016.
 */
import Auth0Lock from 'react-native-lock';
import {AsyncStorage} from "react-native";

class AuthService {
	constructor(clientId, domain) {
		// Configure Auth0
		this.lock = new Auth0Lock({clientId, domain});
		// Add callback for lock `authenticated` event
		//this.lock.on('authenticated', this._doAuthentication.bind(this));
		// binds login functions to keep this context
		console.log('lock', this.lock);
		this.login = this.login.bind(this)
	}

	_doAuthentication(authResult) {
		// Saves the user token
		this.setToken(authResult.idToken);
	}

	login(_callBack) {
		// Call the show method to display the widget.
		const LOCK_OPTIONS = {
			closable: true,
			disableSignUp: true,
			disableResetPassword: false,
		};

		this.lock.show(LOCK_OPTIONS, _callBack);
	}

	loggedIn() {
		// Checks if there is a saved token and it's still valid
		return !!this.getToken();
	}

	async setToken(idToken) {
		// Saves user token to local storage
		try {
			await AsyncStorage.setItem('id_token', JSON.stringify(idToken));
		} catch (error) {
			console.log('error setting token', error);
		}

	}

	async getToken() {
		// Retrieves the user token from local storage
		try {
			let value = await AsyncStorage.getItem('id_token');

			if (value !== null){
				return value;
			} else {
				return null;
			}
		} catch (error) {
			console.log('error getting tokens', error);
			return null;
		}
	}

	async logout() {
		// Clear user token and profile data from local storage
		try {
			await AsyncStorage.removeItem('id_token');
		} catch (error) {
			console.log('error getting tokens', error);
		}

	}
}

export default AuthService;