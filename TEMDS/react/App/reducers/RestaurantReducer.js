/**
 * Created by Saul on 10/29/16.
 */

import {
	RESTAURANT_GET,
	RESTAURANT_DETAIL_GET
} from '../actions/RestaurantAction';

export default function (state = {}, action) {
	switch (action.type) {
		case RESTAURANT_GET:
			return Object.assign({}, state, { info: action.restaurant });
		case RESTAURANT_DETAIL_GET:
			return Object.assign({}, state, { detail: action.detail });
		default:
			return state;
	}
}