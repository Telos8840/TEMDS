/**
 * Created by Saul on 11/26/16.
 */
export const API_ROOT = 'http://localhost:9804/';
// const API_ROOT = 'http://temds.herokuapp.com/';

import Products from './data/Products';
import ProductMenus from './data/ProductMenus';
import ProductMenuDetails from './data/ProductMenuDetails';

class TemdsApi {
	static getAllProducts() {
		/*return fetch(API_ROOT + 'api/venue/list/').then(response =>
		 response.json().then(json => {
		 if (!response.ok) {
		 return Promise.reject(json)
		 }

		 return Promise.resolve(json);
		 })
		 )*/
		return new Promise((resolve) => {
			resolve(Products);
		});
	}

	static getProductMenu(id) {
		return new Promise((resolve) => {
			resolve(ProductMenus[id]);
		});
	}

	static getProductMenuDetail(id) {
		return new Promise((resolve) => {
			resolve(ProductMenuDetails[id]);
		});
	}

	static login(user) {
		return fetch(API_ROOT + 'api/auth/signIn', {
			method: 'POST',
			body: JSON.stringify({
				email: 'seguardado88@gmail.com',
				rawPass: 'password'
			})
		}).then(response =>
			response.json().then(json => {
				console.log('user json', json);
				if (!response.ok) {
					return Promise.reject(json)
				}

				return Promise.resolve(json);
			}));
	}
}

export default TemdsApi;