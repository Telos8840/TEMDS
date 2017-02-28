/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, Platform} from "react-native";
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Ionicons';

import AppEventEmitter from './../../utils/AppEventEmitter';
import Constants from './../../Constants';
import Languages from './../../Languages';
import ToolbarIcon from './ToolbarIcon';
// import {clearProducts} from '../../reducers/Cart/actions'


class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.renderMenu = this.renderMenu.bind(this);
		this.renderConfig = this.renderConfig.bind(this);
		this.backEnable = true;
		this.usedToTransparent = false;
		this.styles = {
			currentToolbar: {},
			baseToolbar: {
				marginTop: Platform.OS === 'ios' ? 15 : 0,
				flexDirection: "row",
				justifyContent: "space-between",
				paddingLeft: 15,
				paddingTop: 13,
				paddingRight: 45,
				height: 40,
				width: Constants.Dimension.ScreenWidth(),
			},
			toolbar_LeftGroup: {
				// flexDirection: "row",
				// justifyContent: "space-between",
				flexDirection: 'row',
				alignItems: 'center',
				backgroundColor: 'transparent',
				width: Constants.Dimension.ScreenWidth()/1.65,
				height: 40,
			},
			itemWrapper: {
				//justifyContent: 'flex-end',
				//padding: 10,
			},
			rightButtonGroup: {
				flexDirection: 'row',
				alignItems: 'center',

			},
			currentTitle: {

			},
			title: {
				fontSize: 20,
				fontWeight: 'bold',
				//marginLeft: 0,
				alignSelf: 'center',
				color: Constants.Color.ToolbarText
			},
			titleTransparent: {
				fontSize: 20,
				fontWeight: 'bold',
				marginLeft: 0,
				color: Constants.Color.ToolbarTextTrans
			},
			EmptyIcon: {height: 40, width: 50},
		}
	}

	static propTypes = {
		title: PropTypes.string,
		menu: PropTypes.bool,
		back: PropTypes.bool,
		cart: PropTypes.bool,
		wishList: PropTypes.bool,
		transparentMode: PropTypes.bool,
		Cart: PropTypes.object.isRequired,
		WishList: PropTypes.object.isRequired,
	};

	static defaultProps = {
		title: 'Toolbar',
		menu: true,
		back: false,
		cart: false,
		wishList: false,
		transparentMode: false,
	};

	componentWillMount() {
		if (this.props.transparentMode)
			this.usedToTransparent = true;
	}

	render() {
		let tempStyle = this.props.transparentMode ?
			{
				backgroundColor: Constants.Color.ToolbarTrans,
				elevation: 0,
			} :
			{
				backgroundColor: Constants.Color.Toolbar,
				elevation: 5,
			}
		if (this.usedToTransparent) {
			tempStyle.position = 'absolute';
			tempStyle.top = 0;
			tempStyle.left = 0;
			tempStyle.zIndex = 10;
		}
		this.styles = Object.assign({}, this.styles, {
			currentToolbar: {...this.styles.baseToolbar, ...tempStyle},
			currentTitle: this.props.transparentMode ? this.styles.titleTransparent : this.styles.title
		});


		const titleOnPress = () => {
			if (this.props.back)
				Actions.pop();
			else
				AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen)
		};

		const title = (
			<TouchableOpacity style={[this.styles.itemWrapper]}
			                  onPress={titleOnPress}>
				<Text style={this.styles.currentTitle}>{this.props.title}</Text>
			</TouchableOpacity>);

		return (
			<View style={this.styles.currentToolbar}>
				{this.renderMenu()}
				<View>
					{title}
				</View>
				<View style={{flexDirection:'row', alignItems:'center'}}>
					{this.props.wishList ? this.renderWishList(this.props.WishList.total) : <View/> }
					{this.props.cart ? this.renderCart(this.props.Cart.total) : <View/> }
				</View>
			</View>
		);
	}

	renderButton(icon, callback) {
		return (
			<View style={{flexDirection:'row',alignItems:'center'}}>
				<TouchableOpacity onPress={callback} style={this.styles.itemWrapper}>
					<Icon name={icon} size={25}
					      color={this.props.transparentMode ? Constants.Color.ToolbarIconTrans : Constants.Color.ToolbarIcon}/>
				</TouchableOpacity>
			</View>
		);
	}

	renderMenu() {
		if (this.props.menu) {
			const openMenu = () => AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen);
			const goBack = () => {
				if (this.backEnable) {
					this.backEnable = false;
					Actions.pop();
				}
			}

			return this.props.back == true ? this.renderButton(Constants.Icon.Back, goBack)
				: this.renderButton(Constants.Icon.Menu, openMenu);
		} else
			return <View style={[this.styles.EmptyIcon, {flexDirection:'row', alignItems:'center'}]}/>
	}

	renderConfig() {
		const openConfig = () => alert("Mock Open Config");

		return this.renderButton(Constants.Icon.More, openConfig);
	}

	renderCart(number) {
		const openCart = () => {
			if (this.props.routes.scene.title == Languages.WishList) Actions.cart({type: 'replace'});
			else Actions.cart();
		}
		return <ToolbarIcon name={number == 0 ? Constants.Icon.ShoppingCartEmpty : Constants.Icon.ShoppingCart}
		                    onPress={openCart} total={number}/>
	}

	renderWishList(number) {
		const openWishList = () => {
			if (this.props.routes.scene.title == Languages.Cart) Actions.wishlist({type: 'replace'});
			else Actions.wishlist();
		}
		return <ToolbarIcon name={number == 0 ? Constants.Icon.WishlistEmpty : Constants.Icon.Wishlist}
		                    onPress={openWishList} total={number}/>
	}
}

const mapStateToProps = (state) => {
	return {
		routes: state.routes,
		Cart: state.Cart,
		WishList: state.WishList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
