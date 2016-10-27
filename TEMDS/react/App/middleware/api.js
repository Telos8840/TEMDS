/**
 * Created by Saul on 10/23/16.
 */
const API_ROOT = 'http://temds.herokuapp.com/';

var SECTIONS = [
	{
		name: 'iTech Pizza',
		category: 'Pizza',
		image: "https://www.itechpizza.com/wp-content/themes/Itechpizaa-thme-wp/images/logo.png",
	},
	{
		name: "Munguia's Mexican Grill",
		category: 'Mexican',
		image: "https://cdn.img42.com/374affc99cec930fb49737565fbe91a7.png",
	}
	// {
	// 	title: 'A C C E S S O R I E S',
	// 	number: '3320',
	// 	keyword: require('../../../images/cate4.png'),
	// },
	// {
	// 	title: 'L O R E M  I P S U M',
	// 	number: '360',
	// 	keyword: require('../../../images/cate5.png'),
	// },
	// {
	// 	title: 'C O N S E C T E T U R',
	// 	number: '340',
	// 	keyword: require('../../../images/cate6.png'),
	// },
	// {
	// 	title: 'A D I P I S I C I N G',
	// 	number: '430',
	// 	keyword: require('../../../images/cate7.png'),
	// }
];

class TEMDSApi {
	static getAllRRestaurants() {
		/*return fetch(API_ROOT + 'api/venue/list/').then(response =>
			response.json().then(json => {
				if (!response.ok) {
					return Promise.reject(json)
				}

				return Promise.resolve(json);
			})
		)*/
		return new Promise((resolve) => {
			resolve(SECTIONS);
		});
	}
}

export default TEMDSApi;