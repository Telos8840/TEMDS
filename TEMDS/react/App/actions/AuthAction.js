/**
 * Created by Saul on 10/27/16.
 */

import TEMDSApi from '../middleware/api';

export const LOGIN_POST = 'LOGIN_POST';
export function loginAction(user) {
	return {
		type: LOGIN_POST,
		user
	};
}

export function login(user) {
	return dispatch => {
		return TEMDSApi.login(user).then(user => {
			console.log('json', user);
			dispatch(loginAction(user));
		}).catch(error => {
			throw(error);
		});
	};
}