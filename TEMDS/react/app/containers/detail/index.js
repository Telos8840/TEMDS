/**
 * Created by Saul on 10/16/16.
 */

'use strict';

import React, {Component} from "react";
import {
	ListView,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Dimensions,
	AppRegistry,
	TouchableWithoutFeedback
} from "react-native";
import {Actions} from "react-native-router-flux";
import Toolbar from "./../../components/Toolbar";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import EventEmitter from './../../utils/AppEventEmitter'
import RadioForm from "../../components/RadioButton";
import CheckBoxForm from "../../components/Checkbox";
import Constants from './../../Constants';
import TimerMixin from 'react-timer-mixin';
import LogoSpinner from "./../../components/LogoSpinner";
import {addCartItem} from '../../reducers/Cart/actions';
import {fetchProductDetailById} from '../../reducers/Detail/actions';

import {List, Text} from 'native-base';

import {connect} from 'react-redux';

import _ from 'lodash';

let details = null,
	selectedRadios = {},
	selectedChecks = {};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	detailButton: {
		backgroundColor: "#1CAADE",
		width: Constants.Dimension.ScreenWidth(),
		height: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	activityIndicator: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3F51B5',
		flexDirection: 'column',
		paddingTop: 25
	},
	headerText: {
		color: '#212121',
		paddingHorizontal: 8,
		fontSize: 16
	},
	headerSubText: {
		color: '#939396',
		paddingHorizontal: 8,
		fontSize: 14
	},
	rowStyle: {
		paddingVertical: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderTopColor: 'white',
		borderLeftColor: 'white',
		borderRightColor: 'white',
		borderBottomColor: '#D4D4D9',
		borderWidth: 1
	},
	rowText: {
		color: '#212121',
		fontSize: 16
	},
	subText: {
		fontSize: 14,
		color: '#575759'
	},
	section: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 6,
		backgroundColor: '#D4D4D9'
	},
	menuContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 12
	},
	iconFormat: {
		left: 8,
		top: 5,
		position: "absolute"
	},
	icon: {
		width: 20,
		color: '#727272',
		fontSize: 22,
	},
	productItem: {
		//flex: 1,
		width: Constants.Dimension.ScreenWidth(),
		height: (Constants.Dimension.ScreenHeight()-40)*962/875,
		// "width": width-30,
		// "height":  (width-20)*962/875,
		//"marginTop": 5,
		// "marginRight": 5,
		marginBottom: 10,
		// "marginLeft": 5
	},
	detailPanel: {
		height: 300,
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end"
	},
	detailBlock: {
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.5)",
		paddingTop: 20,
		paddingRight: 20,
		paddingBottom: 20,
		paddingLeft: 20
	},
	detailName: {
		//color: "#535353",
		fontWeight: "400",
		fontSize: 18,
		paddingTop: 8
	},
	detailDesc: {
		//color: "#535353",
		fontWeight: "400",
		fontSize: 14,
		paddingTop: 10,
		textAlign: "center"
	},
	detailPrice: {
		fontSize: 14,
		width: 100,
		textAlign: "center"
	},
	detailsBtnTxt: {
		fontSize: 12,
		fontWeight: "600",
		color: "white"
	},
	cartRow: {
		position: "absolute",
		bottom: 0,
		flexDirection:"row",
		alignItems: "center",
		justifyContent: "space-around"
	}
});
class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isWaiting: true,
			isFetching: true
		};

		console.log('det cons', props);
	}

	componentWillMount() {
		this.props.fetchProductDetailById(this.props.productId, () => this.setState({isWaiting: false}));
		//TimerMixin.setTimeout(() => this.props.fetchProductDetailById(this.props.productId, () => this.setState({isWaiting: false})), 500);
	}

	componentDidMount() {
		//EventEmitter.addListener('cart.click', this._addToCart.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		console.log('next prop', nextProps);
		if (nextProps.detail !== undefined) {
			details = nextProps.detail;
		}

	}

	_renderOptionList() {
		let listView = details.menuOptions.map((option, i) => (
			<View key={i}>
				<List>
					<View style={styles.section}>
						<Text style={styles.headerText}>{option.title}</Text>
						<Text style={styles.headerSubText}>({option.type})</Text>
					</View>
					{
						option.type === 'required' ? (
							<RadioForm
								radio_props={option.options}
								initial={0}
								optionId={option.id}
								onPress={this._handleRadioPress}
							/>
						) : (
							option.options.map((opt, i) => (
								<CheckBoxForm
									key={i}
									style={styles}
									object={opt}
									optionId={option.id}
									onPress={this._handleCheckboxPress}
								/>
							))
						)
					}
				</List>
			</View>
		));

		return listView;
	}

	_handleRadioPress(option, id, optionId) {
		selectedRadios[optionId] = option;
	}

	_handleCheckboxPress(option, id, isChecked) {
		if (isChecked) {
			_.isArray(selectedChecks[id]) ?
				selectedChecks[id].push(option) :
				selectedChecks[id] = [option];
		} else {
			selectedChecks[id] = _.remove(selectedChecks[id], (check) => {
				return check.id == option.id;
			});
		}
	}

	_addToCart() {
		console.log('cart', selectedRadios, selectedChecks);
	}

	render() {
		if (this.state.isWaiting)
			return <LogoSpinner fullStretch/>;

		return (
			<View style={styles.container}>
				<ParallaxScrollView
					backgroundColor="white"
					contentBackgroundColor="white"
					parallaxHeaderHeight={Constants.Dimension.ScreenWidth()}
					renderFixedHeader={() => (
						<Toolbar {...this.props}/>
					)}
					renderBackground={() => (
						<View style={{marginTop: 38}}>
							<Image style={styles.productItem} source={{ uri: details.image} } />
						</View>
					)}
					renderForeground={() => (
						<View style={styles.detailPanel}>
							<View style={styles.detailBlock}>
								<Text style={styles.detailName}>{details.name}</Text>
								<Text style={styles.detailDesc}>{details.description}</Text>
								<Text style={styles.detailPrice}>${details.price}</Text>
							</View>
						</View>
					)}>

					{this._renderOptionList()}

				</ParallaxScrollView>
				<View style={styles.cartRow}>
					<TouchableOpacity style={styles.detailButton} onPress={this._addToCart}>
						<Text style={styles.detailsBtnTxt}>ADD TO CART</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('detail state', state);
	return {
		currentDetail: state.Detail.currentProductDetail,
		detail: state.Detail.currentProductDetail.detail,
		Cart: state.Cart,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCartItem: (product, variation) => {
			dispatch(addCartItem(product, variation));
		},
		fetchProductDetailById: (productId, callback) => {
			dispatch(fetchProductDetailById(productId, callback));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
