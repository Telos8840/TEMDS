/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react';
import {Alert, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import Constants from './../../Constants';
import Languages from './../../Languages';
import {addCartItem, removeCartItem, deleteCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'

class CartItemRow extends Component {
	constructor(props) {
		super(props);
		this.styles = {
			container: {
				height: undefined,
				width: undefined,
				borderColor: Constants.Color.ViewBorder,
				borderWidth: 1,
				flexDirection: 'row',
				marginTop: 10,
			},
			optionsContainer: {
				flexDirection: 'column',
				justifyContent: 'space-around',
				flexWrap: 'wrap',
				maxHeight: 85,
				maxWidth: 120,
				marginLeft: 15,
			},
			row_center: {
				flexDirection: 'row',
				justifyContent: 'center',
			},
			image: {
				width: Constants.Dimension.ScreenWidth(0.3),
				height: Constants.Dimension.ScreenWidth(0.3) * 1.2,
			},
			product_name: {
				padding: 10,
				paddingTop: 5,
				paddingBottom: 5,
				height: undefined,
				justifyContent: 'flex-start',
			},
			product_price: {
				padding: 10,
				paddingTop: 0,
				paddingBottom: 0,
				flex: 1,
				justifyContent: 'flex-start',
			},
			product_variation: {
				padding: 10,
				paddingTop: 5,
				paddingBottom: 5,
				flex: 1,
				justifyContent: 'center',
			},
			buttons_wrapper: {
				padding: 10,
				paddingTop: 5,
				paddingBottom: 5,
				flex: 1,
				justifyContent: 'flex-end',
			},
			itemWrapper: {
				justifyContent: 'center',
				padding: 0,
				marginLeft: 10,
			},
		}
		console.log('car row', props);
	}

	static propTypes = {
		cartItem: PropTypes.object.isRequired,
		addCartItem: PropTypes.func.isRequired,
		addWishListItem: PropTypes.func.isRequired,
		removeWishListItem: PropTypes.func.isRequired,
		// onPress: PropTypes.func.isRequired,
	};

	render() {
		const _product = this.props.cartItem.product;
		const _variation = this.props.cartItem.variation;

		this.isInWishList = this.props.wishLists.find((item) => item.product.id == _product.id) != undefined;

		const productImage = (<Image
			source={_product.image != undefined ? {uri: _product.image} : Constants.Image.PlaceHolder}
			style={this.styles.image}
			resizeMode="cover"
		/>);

		const productName = (<Text
			ellipsizeMode={'tail'}
			numberOfLines={2}
			style={this.styles.product_name}
		>
			{_product.name} - {_product.itemName}
		</Text>);

		const productVariations = (<Text
			ellipsizeMode={'tail'}
			numberOfLines={2}
			style={this.styles.product_name}
		>
			{this.renderAttributeOptions(_variation)}
		</Text>);

		return (
			<View style={this.styles.container}>
				{productImage}
				<View style={{flex: 1}}>
					<View style={this.styles.row_center}>
						{productName}

					</View>

					<ScrollView style={{height: 90}}>
						<View style={this.styles.optionsContainer}>
						{_product.options.map((opt, i) => {
							return (
								<Text key={i}>{opt.option}</Text>
							);
						})}

						</View>
					</ScrollView>
					{this.renderButtonsGroup()}
				</View>
			</View>
		);
	}

	renderAttributeOptions(_variation) {
		let s = '';
		if (_variation !== undefined)
			_variation.attributes.forEach((attribute) => {
				s += attribute.name + ': ' + attribute.option + ' ';
			}, this);
		return s;
	}

	renderButtonsGroup() {
		const styles = {
			row: {
				flexDirection: 'row',
			},
			row_end: {
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
			buttonLeft: {
				justifyContent: 'center',
				paddingLeft: 10,
				paddingRight: 10,
				borderColor: Constants.Color.ViewBorder,
				borderWidth: 1,
				borderTopLeftRadius: 4,
				borderBottomLeftRadius: 4,
			},
			buttonMiddle: {
				justifyContent: 'center',
				paddingLeft: 10,
				paddingRight: 10,
				borderColor: Constants.Color.ViewBorder,
				borderBottomWidth: 1,
				borderTopWidth: 1,
			},
			buttonRight: {
				justifyContent: 'center',
				paddingLeft: 10,
				paddingRight: 10,
				borderColor: Constants.Color.ViewBorder,
				borderWidth: 1,
				borderTopRightRadius: 4,
				borderBottomRightRadius: 4,
			},
			buttonWishList: {},
			buttonDelete: {},
		};


		const {product, variation, quantity} =  this.props.cartItem;
		const hitBottomLimit = quantity == 1;
		const hitTopLimit = quantity == 5;

		const pnPressWishList = () => {
			if (this.isInWishList)
				this.props.removeWishListItem(product, variation);
			else
				this.props.addWishListItem(product, variation);
		};

		const onPressDelete = () => {
			Alert.alert(
				Languages.Confirm,
				Languages.RemoveCartItemConfirm,
				[
					{text: Languages.CANCEL, onPress: () => undefined},
					{text: Languages.YES, onPress: () => this.props.deleteCartItem(product, variation, quantity)},
				]
			);
		};

		return (<View style={this.styles.buttons_wrapper}>
			<View style={styles.row_end}>
				<View>
					<Text>${product.price}</Text>
				</View>
				<View>
					{this.renderIconButton(Constants.Icon.Delete, onPressDelete)}
				</View>
			</View>
		</View>);
	}

	renderIconButton(icon, callback) {
		return (
			<TouchableOpacity onPress={callback} style={this.styles.itemWrapper}>
				<Icon name={icon} size={25}
				      color={Constants.Color.ViewBorder}/>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('cart', state.Cart);
	return {
		Cart: state.Cart,
		wishLists: state.WishList.wishListItems,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCartItem: (product, variation) => {
			dispatch(addCartItem(product, variation));
		},
		removeCartItem: (product, variation) => {
			dispatch(removeCartItem(product, variation));
		},
		deleteCartItem: (product, variation, quantity) => {
			dispatch(deleteCartItem(product, variation, quantity));
		},
		addWishListItem: (product, variation) => {
			dispatch(addWishListItem(product, variation));
		},
		removeWishListItem: (product, variation) => {
			dispatch(removeWishListItem(product, variation));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRow);
