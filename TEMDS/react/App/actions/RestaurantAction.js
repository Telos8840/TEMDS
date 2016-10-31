/**
 * Created by Saul on 10/29/16.
 */

import TEMDSApi from '../middleware/api';

export const RESTAURANT_GET = 'RESTAURANT_GET';
function getRestaurantInfoAction(restaurant) {
	return {
		type: RESTAURANT_GET,
		restaurant
	};
}

export const RESTAURANT_DETAIL_GET = 'RESTAURANT_DETAIL_GET';
function getRestaurantDetailAction(detail) {
	return {
		type: RESTAURANT_DETAIL_GET,
		detail
	};
}

export function getRestaurantInfo() {
	return dispatch => {
		return TEMDSApi.getRestaurantInfo().then(restaurant => {
			console.log('dispatching info');
			dispatch(getRestaurantInfoAction(restaurant));
		}).catch(error => {
			throw(error);
		});
	};
}

export function getRestaurantDetail() {
	return dispatch => {
		return TEMDSApi.getRestaurantDetail().then(detail => {
			dispatch(getRestaurantDetailAction(detail));
		}).catch(error => {
			throw(error);
		});
	};
}