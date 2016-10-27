/**
 * Created by Saul on 10/23/16.
 */

import TEMDSApi from '../middleware/api';

export const HOME_GET = 'HOME_GET';
export function loadRestaurantsAction(restaurants) {
	return {
		type: HOME_GET,
		restaurants
	};
}

export function loadRestaurants() {
	return dispatch => {
		return TEMDSApi.getAllRRestaurants().then(restaurants => {
			console.log('json', restaurants);
			dispatch(loadRestaurantsAction(restaurants));
		}).catch(error => {
			throw(error);
		});
	};
}