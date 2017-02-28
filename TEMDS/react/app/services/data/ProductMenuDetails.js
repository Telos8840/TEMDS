/**
 * Created by Saul on 1/28/17.
 */

const ITECH_DETAIL1 = {
	id: '0',
	productId: '0',
	itemName: 'Hawaiian',
	image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-hawaiian.jpg',
	price: '8.99',
	description: 'Consists of a cheese and tomato base with pieces of ham and pineapple',
	defaultOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				}
			]
		}
	],
	menuOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				},
				{
					id: '0',
					option: '12"',
					price: '3.00',
				}
			]
		},
		{
			id: '1',
			title: 'Testing',
			type: 'optional',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				},
				{
					id: '1',
					option: '12"',
					price: '1.00',
				},
				{
					id: '2',
					option: '12"',
					price: '2.00',
				},
				{
					id: '3',
					option: '12"',
					price: '3.00',
				},
				{
					id: '4',
					option: '12"',
					price: '4.00',
				},
				{
					id: '5',
					option: '12"',
					price: '5.00',
				},
				{
					id: '6',
					option: '12"',
					price: '6.00',
				},
				{
					id: '7',
					option: '12"',
					price: '7.00',
				},
				{
					id: '8',
					option: '12"',
					price: '8.00',
				}
			]
		}
	]
};
const ITECH_DETAIL2 = {
	id: '1',
	productId: '0',
	itemName: 'Pepperoni',
	image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-pepperoni.jpg',
	price: '7.99',
	description: 'Consists of a cheese and tomato base with pieces of pepperoni',
	defaultOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				}
			]
		}
	],
	menuOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				},
				{
					id: '1',
					option: '12"',
					price: '3.29',
				}
			]
		}
	]
};
const ITECH_DETAIL3 = {
	id: '2',
	productId: '0',
	itemName: 'Seafood',
	image: 'https://www.itechpizza.com/wp-content/uploads/2015/03/pic-pizza-seafood.jpg',
	price: '9.98',
	description: 'Comes with crab, scallops, and veggies',
	defaultOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				}
			]
		}
	],
	menuOptions: [
		{
			id: '0',
			title: 'Size',
			type: 'required',
			options: [
				{
					id: '0',
					option: '9"',
					price: '0.00',
				},
				{
					id: '1',
					option: '12"',
					price: '3.30',
				}
			]
		}
	]
};

const ProductMenuDetails = [ITECH_DETAIL1, ITECH_DETAIL2, ITECH_DETAIL3];

export default ProductMenuDetails;