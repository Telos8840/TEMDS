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
import css from "../../Styles/style";
import cart from "../../Styles/cart";
import Toolbar from "../../Controls/Toolbar";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import product from "../../Styles/product";
import AppEventEmitter from "../../../Services/AppEventEmitter";
import Swiper from "../../../../node_modules/react-native-swiper";
import ProductSelector from "./ProductSelector";
import RadioForm from "../../Controls/RadioForm";
import CheckBoxForm from "../../Controls/CheckBoxForm";


import { List, Text} from 'native-base';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestaurantActions from '../../../actions/RestaurantAction';

let deviceWidth = Dimensions.get('window').width,
	details = null;

class RestaurantDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			selectedOption: {}
		};

		this.props.actions.getRestaurantDetail();
	}

	componentWillReceiveProps(nextProps) {
		details = nextProps.detail;
		this.setState({
			loaded: true
		});
	}

	render() {
		return (
			this.state.loaded &&
			<View style={product.color}>
				<ParallaxScrollView
					backgroundColor="white"
					contentBackgroundColor="white"
					parallaxHeaderHeight={deviceWidth}
					renderFixedHeader={() => (
						<Toolbar name={details.name} action={Actions.restaurant} isChild={true} cartButton={true}/>
					)}
					renderBackground={() => (
						<View style={{marginTop: 38}}>
							<Image style={product.productItem} source={{ uri: details.image} } />
						</View>
					)}
					renderForeground={() => (
						<View style={product.detailPanel}>
							<View style={product.detailBlock}>
								<Text style={product.detailName}>{details.name}</Text>
								<Text style={product.detailDesc}>{details.description}</Text>
								<Text style={product.detailPrice}>${details.price}</Text>
							</View>
						</View>
					)}>
					{details.menuOptions.map((option, i) => (
						<View key={i}>
							<List>
								<View style={styles.section}>
									<Text style={styles.headerText}>{option.title}</Text>
									<Text style={styles.headerSubText}>({option.type})</Text>
								</View>

								{option.type === 'required' ? (
									<RadioForm
										radio_props={option.options}
										initial={0}
										onPress={(value) => {
											this.setState({value:value}
											)}}
									/>
								) : (
									option.options.map((opt, i) => (
										<CheckBoxForm
											key={i}
											style={styles}
											object={opt}
											onPress={(value) => {
												this.setState({value:value}
												)}}
										/>
									))
								)
								}
							</List>
						</View>
					))}
				</ParallaxScrollView>
				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
					<TouchableOpacity style={[product.detailsBtnFullWidth, css.backgroundColor]} onPress={Actions.restaurant}>
						<Text style={[product.detailsBtnTxt,{color:'white'}]}>ADD TO CART</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
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
	}
});

function mapStateToProps(state) {
	return {
		detail: state.restaurant.detail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			getRestaurantDetail: RestaurantActions.getRestaurantDetail
		}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
