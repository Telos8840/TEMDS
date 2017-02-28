/**
 * Created by Saul on 12/4/16.
 */

import {
	SELECT_DETAIL,
	REQUEST_DETAIL,
	RECEIVE_DETAIL,
	DETAIL_FAILURE,
	CLEAR_DETAIL
} from './actions';

function productDetailReducer(state = {isFetching: false, detail: undefined}, action) {
	switch (action.type) {
		case SELECT_DETAIL:
			return Object.assign({}, state, {selectedDetail: action.selectedDetail});
		case REQUEST_DETAIL:
			return state;
		case RECEIVE_DETAIL:
			return Object.assign({}, state, {detail: action.detail});
		case DETAIL_FAILURE:
			return Object.assign({}, state, {error: action.error});
		case CLEAR_DETAIL:
			return Object.assign({}, state, {detail: undefined});
		default:
			return state
	}
}

export default function Detail(state = {
	isFetching: false,
	detail: {},
	stillFetch: true,
	selectedDetail: ''
}, action) {
	return {
		currentProductDetail: productDetailReducer(state.currentProductDetail, action)
	}
}