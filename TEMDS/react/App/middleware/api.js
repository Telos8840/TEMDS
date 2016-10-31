/**
 * Created by Saul on 10/23/16.
 */
export const API_ROOT = 'http://localhost:9804/';
// const API_ROOT = 'http://temds.herokuapp.com/';

let HOME_LIST = [
	{
		id: '0',
		name: 'iTech Pizza',
		category: 'Pizza',
		image: "https://www.itechpizza.com/wp-content/themes/Itechpizaa-thme-wp/images/logo.png",
	},
	{
		id: '1',
		name: "Munguia's Mexican Grill",
		category: 'Mexican',
		image: "https://cdn.img42.com/374affc99cec930fb49737565fbe91a7.png",
	}
];

/*let RESTAURANT = {
 id: '',
 name: '',
 mainImage: '',
 menu: [{
 title: '',
 items: [{
 id: '',
 name: '',
 image: '',
 price: ''
 }]
 }]
 };*/

let RESTAURANT_DETAIL = {
	id: '',
	restaurantId: '',
	name: '',
	price: '',
	description: '',
	menuOptions: [{
		title: '',
		type: '',
		options: [{
			option: '',
			price: ''
		}]
	}]
};

let ITECH = {
	id: '0',
	name: 'iTech Pizza',
	mainImage: 'https://www.itechpizza.com/wp-content/themes/Itechpizaa-thme-wp/images/logo.png',
	menu: [
		{
			title: 'Pizza',
			items: [
				{
					id: '0',
					name: 'Hawaiian',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-hawaiian.jpg',
					price: '8.99'
				},
				{
					id: '1',
					name: 'Pepperoni',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-pepperoni.jpg',
					price: '7.99'
				},
				{
					id: '2',
					name: 'Seafood',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-seafood.jpg',
					price: '9.98'
				},
				{
					id: '3',
					name: 'Spicy Hot',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-spicy.jpg',
					price: '8.99'
				},
				{
					id: '4',
					name: 'Buffalo Chicken',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/03/Buffalo-pizza-New1.jpg',
					price: '8.99'
				},
				{
					id: '5',
					name: 'Dessert',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/03/dessert-pizza.jpg',
					price: '8.99'
				},
				{
					id: '13',
					name: 'Choose It Yourself Pizza',
					image: 'http://st2.depositphotos.com/1177973/6096/i/450/depositphotos_60963239-stock-photo-tasty-pizza-and-falling-ingredients.jpg',
					price: '8.99'
				}
			]
		},
		{
			title: 'Pastas – Fries – Seafood',
			items: [
				{
					id: '6',
					name: 'Mac & Cheese',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Mac-and-Cheese.jpg',
					price: '7.99'
				},
				{
					id: '7',
					name: 'Garlic Linguine',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/02/Garlic-linguini.jpg',
					price: '6.25'
				},
				{
					id: '8',
					name: 'Garlic Shrimp',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/02/Garlic-Shrimp.jpg',
					price: '11.88'
				},
				{
					id: '9',
					name: 'Italian Fries',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/02/italian-Fries.jpg',
					price: '4.25'
				},
				{
					id: '10',
					name: 'Garlic Fries',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/02/Garlic-Fries.jpg',
					price: '4.25'
				},
				{
					id: '11',
					name: 'Linguine With Tomato Sauce (Pork)',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Linguine-With-Red-Meat-Sauce.jpg',
					price: '8.99'
				},
				{
					id: '12',
					name: 'Linguine With Alfredo Sauce (Chicken)',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Linguine-With-White-Cream-Sauce.jpg',
					price: '9.99'
				}
			]
		},
		{
			title: 'Wings (our signature golden wings)',
			items: [
				{
					id: '14',
					name: 'Golden Wings',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/10/Wings-logo1.jpg',
					price: '7.99'
				}
			]
		},
		{
			title: 'Salads',
			items: [
				{
					id: '15',
					name: 'Salad',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Salad.jpg',
					price: '6.98'
				}
			]
		},
		{
			title: 'Beverages',
			items: [
				{
					id: '16',
					name: 'Hot Chocolate',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Hot-Chocolate.jpg',
					price: '3.45'
				},
				{
					id: '17',
					name: 'Hot Coffee',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Hot-Coffee.jpg',
					price: '3.45'
				},
				{
					id: '18',
					name: 'Hot Tea',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Hot-Tea.jpg',
					price: '2.99'
				},
				{
					id: '19',
					name: 'Iced Coffee',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Iced-Coffee.jpg',
					price: '3.45'
				},
				{
					id: '20',
					name: 'Iced Tea',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Iced-Tea.jpg',
					price: '1.99'
				},
				{
					id: '21',
					name: 'Soda',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Soda.jpg',
					price: '1.99'
				},
				{
					id: '22',
					name: 'Boba Drink',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/01/boba.jpg',
					price: '3.95'
				},
				{
					id: '23',
					name: 'Jelly Drink',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/01/jellydrink.jpg',
					price: '3.95'
				},
				{
					id: '24',
					name: 'Pink Lemondae',
					image: 'https://www.itechpizza.com/wp-content/uploads/2016/01/Lemon-logo.jpg',
					price: '1.99'
				}
			]
		},
		{
			title: 'Desserts',
			items: [
				{
					id: '25',
					name: 'Cheesecake',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Cheesecake.jpg',
					price: '4.99'
				},
				{
					id: '26',
					name: 'Tiramisu',
					image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/Tiramisu.jpg',
					price: '4.99'
				}
			]
		}
	]
};

let ITECH_DETAIL = {
	id: '0',
	restaurantId: '0',
	name: 'Hawaiian',
	image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-hawaiian.jpg',
	price: '8.99',
	description: 'Consists of a cheese and tomato base with pieces of ham and pineapple',
	menuOptions: [{
		title: 'Size',
		type: 'required',
		options: [
			{
				option: '9 Inches',
				price: '8.99'
			},
			{
				option: '12 Inches',
				price: '11.99'
			}
		]
	}]
};

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
			resolve(HOME_LIST);
		});
	}

	static getRestaurantInfo(id) {
		return new Promise((resolve) => {
			resolve(ITECH);
		});
	}

	static getRestaurantDetail(id) {
		return new Promise((resolve) => {
			resolve(ITECH_DETAIL);
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

export default TEMDSApi;