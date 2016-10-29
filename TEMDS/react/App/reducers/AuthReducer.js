/**
 * Created by Saul on 10/27/16.
 */

import {LOGIN_POST} from '../actions/AuthAction';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_POST:
			return Object.assign({}, state, action.user);
		default:
			return state;
	}
}