'use strict';

import React, {Component, PropTypes} from "react";
import {Image, Text, View, TouchableOpacity, ScrollView, ToastAndroid, BackAndroid} from "react-native";
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";

import Spinner from './../../components/Spinner';
import Lock, {LOCK_OPTIONS} from "../../services/Auth0";
import WooWorker from "../../services/WooWorker";
import {signIn, signOut} from './../../reducers/Customer/actions';

import css from "./css";
import AppEventEmitter from './../../utils/AppEventEmitter';
import Constants from "../../Constants"
import Languages from "../../Languages"

/**
 * This is navigator bar as side menu.
 * This component is always on mount state in all application scences.
 * Put any global checking process in this class
 *
 * @class SideMenu
 */

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			customer: props.customer
		};

		this.styles = {
			sideMenu: {
				backgroundColor: Constants.Color.SideMenu,
				flex: 1,
			},
			menuRow: {
				flexDirection: "row",
				alignItems: "center",
				marginBottom: 20,
			},
			icon: {
				fontSize: 24,
				marginRight: 20
			},
			avatar_container: {
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			},
			avatar: {height: 60, width: 60, borderRadius: 30},
			avatar_background: {width: Constants.Dimension.ScreenWidth(0.7), height: 150, padding: 20},
			fullName: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
			email: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
		};

		this.dispatchWrapper = (func) => {
			func();
			AppEventEmitter.emit(Constants.EmitCode.SideMenuClose);
		};

		console.log('side menu', props);
	}

	static propTypes = {
		customer: PropTypes.object.isRequired,
		signOut: PropTypes.func.isRequired,
		signIn: PropTypes.func.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		console.log('updating', nextProps);
		if (nextProps.customer) {
			this.setState({
				customer: nextProps.customer
			})
		}
	}



	render() {
		const {signOut} = this.props;
		let fullName = Languages.GuestAccount;
		let email = '';
		let picture = Constants.Image.DefaultAvatar;
		console.log('rendering', this.state.customer);
		if (this.state.customer !== undefined) {
			fullName = this.state.customer.name;
			//email = this.state.customer.email;
			picture = {uri: this.state.customer.avatar_url};
		}

		const renderSignIn = () => (
            <TouchableOpacity
                style={this.styles.menuRow}
                onPress={() => this.login() }>
                <Icon name={Constants.Icon.SignIn} style={css.icon}/>
                <Text style={css.menuLink}>{Languages.SignIn}</Text>
            </TouchableOpacity>);
		const renderSignOut = () => (
            <TouchableOpacity
                style={this.styles.menuRow}
                onPress={() => signOut() }>
                <Icon name={Constants.Icon.SignOut} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                <Text style={css.menuLink}>{Languages.SignOut}</Text>
            </TouchableOpacity>);

		return (
            <View style={this.styles.sideMenu}>
				{this.state.isLoading ? <View style={this.styles.avatar_background}><Spinner fullStretch/></View> :
                    <Image
                        source={Constants.Image.AvatarBackground}
                        style={this.styles.avatar_background}
                        resizeMode='cover'>
                        <View style={this.styles.avatar_container}>
                            <Image source={picture} style={this.styles.avatar}/>
                            <Text style={this.styles.fullName}>{fullName}</Text>
                            <Text style={this.styles.email}>{email}</Text>
                        </View>
                    </Image>
				}
                <ScrollView style={{padding: 20}}>
					{/*{this.props.customer.email == undefined ? renderSignIn() : renderSignOut()}*/}
                    <TouchableOpacity
                        style={this.styles.menuRow}
                        underlayColor="#2D2D30"
                        onPress={() => this.dispatchWrapper(() => Actions.home({type: ActionConst.RESET}))}>
                        <Icon name={Constants.Icon.Home} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                        <Text style={css.menuLink}>{Languages.Home}</Text>
                    </TouchableOpacity>
					{/*<TouchableOpacity
                     style={this.styles.menuRow}
                     underlayColor="#2D2D30"
                     onPress={() => this.dispatchWrapper(() => Actions.wishlist())}>
                     <Icon name={Constants.Icon.Wishlist} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                     <Text style={css.menuLink}>{Languages.WishList}</Text>
                     </TouchableOpacity>*/}
                    <TouchableOpacity
                        style={this.styles.menuRow}
                        underlayColor="#2D2D30"
                        onPress={() => this.dispatchWrapper(() => Actions.myorder())}>
                        <Icon name={Constants.Icon.MyOrder} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                        <Text style={css.menuLink}>{Languages.MyOrder}</Text>
                    </TouchableOpacity>
					{/*<TouchableOpacity
                     style={this.styles.menuRow}
                     underlayColor="#2D2D30"
                     onPress={() => this.dispatchWrapper(() => Actions.news())}>
                     <Icon name={Constants.Icon.News} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                     <Text style={css.menuLink}>{Languages.News}</Text>
                     </TouchableOpacity>*/}
                    <TouchableOpacity
                        style={this.styles.menuRow}
                        underlayColor="#2D2D30"
                        onPress={() => this.dispatchWrapper(() => Actions.settings())}>
                        <Icon name={Constants.Icon.Config} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                        <Text style={css.menuLink}>{Languages.Settings}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
		);
	}

	login() {
		this.setState({isLoading: true});
		Lock.show(LOCK_OPTIONS, (err, profile, token) => {
			// console.log('error ' + JSON.stringify(err));
			// console.log('profile ' + JSON.stringify(profile));
			// console.log('token ' + JSON.stringify(token));
			if (err != null || profile == null || token == null) {
				alert(JSON.stringify(err));
				this.setState({isLoading: false});
			} else if (profile.email == null || profile.email_verified == false) {
				if (profile.email == null)
					alert(profile.email_verified ? Languages.CantReactEmailError : Languages.NoEmailError)
				if (profile.email_verified == false && profile.email != null)
					alert(Languages.EmailIsNotVerifiedError);
			} else {
				const makeRandomPassword = (length) => {
					const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					let text = "";
					for (let i = 0; i < length; i++)
						text += possible.charAt(Math.floor(Math.random() * possible.length));
					return text;
				}
				const customerIsExisted = (customer) => {
					// console.log('found')
					// if (password != undefined) {
					//It's mean this function got call by signup form. Drop.
					// alert('This email already exist');
					// this.setState({isLoading: false});
					// } else {
					const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
					this.props.signIn(_customer);
					this.setState({isLoading: false});
					// if (DBHelper.saveCustomer(customer) != undefined) {
					// this.setState({isLoading: false});
					// EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
					// Actions.home({type: "reset"});
					// }
					// }
				}
				let makeNewCustomer = () => {
					let data = {
						"email": profile.email,
						"first_name": profile.family_name,
						"last_name": profile.given_name,
						"username": profile.email,
						"password": makeRandomPassword(10),
						"avatar_url": profile.picture == undefined ? null : profile.picture,
						"billing": {
							"first_name": profile.family_name,
							"last_name": profile.given_name,
							"email": profile.email,
						},
						"shipping": {
							"first_name": profile.family_name,
							"last_name": profile.given_name,
						}
					}

					WooWorker.createCustomer(data, (customer) => {
						const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
						this.props.signIn(_customer)
						this.setState({isLoading: false});
						// if (DBHelper.saveCustomer(customer) != undefined) {
						//     this.setState({isLoading: false});
						//     EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
						//     Actions.home({type: "reset"});
						// }
					});
				}
				WooWorker.customerByEmail(profile.email, customerIsExisted, makeNewCustomer)
			}
		});
	}
}
const mapStateToProps = (state) => {
	return {
		customer: state.Customer,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (customer) => {
			dispatch(signIn(customer));
		},
		signOut: () => {
			dispatch(signOut());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);