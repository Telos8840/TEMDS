/**
 * Created by Saul on 12/4/16.
 */

import TemdsAPI from "../../services/TemdsApi";

export const SELECT_DETAIL = 'SELECT_DETAIL';
export const REQUEST_DETAIL = 'REQUEST_DETAIL';
export const RECEIVE_DETAIL = 'RECEIVE_DETAIL';
export const DETAIL_FAILURE = 'DETAIL_FAILURE';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export function selectDetail(selectedDetail) {
	return {
		type: SELECT_DETAIL,
		selectedDetail,
	}
}

export function requestDetail() {
	return {
		type: REQUEST_DETAIL,
	}
}

export function receiveDetail(json) {
	return {
		type: RECEIVE_DETAIL,
		detail: json,
	}
}

export function detailFailure(error) {
	return {
		type: DETAIL_FAILURE,
		error: error,
	}
}

export function clearDetail() {
	return {type: CLEAR_DETAIL}
}

export function fetchProductDetailById(productId, _callback) {
	return dispatch => {
		dispatch(requestDetail());
		return TemdsAPI.getRestaurantDetail(productId).then(detail => {
			dispatch(receiveDetail(detail));
			_callback();
			console.log('api', detail);
		}).catch(error => {
			dispatch(detailFailure(error));
		});
	};
}