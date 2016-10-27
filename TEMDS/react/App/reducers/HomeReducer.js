/**
 * Created by Saul on 10/23/16.
 */

import {HOME_GET} from '../actions/HomeAction';

export default function (state = {}, action) {
	switch (action.type) {
		case HOME_GET:
			return Object.assign({}, state, action.restaurants);
		default:
			return state;
	}
}