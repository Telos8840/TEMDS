/**
 * Created by Saul on 10/16/16.
 */

'use strict';

import React, {Component} from "react";
import {
	ListView,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Dimensions,
	AppRegistry
} from "react-native";
import {Actions} from "react-native-router-flux";
import css from "../../Styles/style";
import Toolbar from "../../Controls/Toolbar";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import product from "../../Styles/product";
import Modal from "react-native-modalbox";
import AppEventEmitter from "../../../Services/AppEventEmitter";
import Swiper from "../../../../node_modules/react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import ProductSelector from "./ProductSelector";

var deviceWidth = Dimensions.get('window').width;

export default class RestaurantDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected1: 'key1'
		}
	}

	componentDidMount() {
		AppEventEmitter.addListener('open.product.click', this.openProductDetail.bind(this));
		AppEventEmitter.addListener('close.product.click', this.closeProductDetail.bind(this));
	}

	onValueChange(key, value) {
		const newState = {};
		newState[key] = value;
		this.setState(newState);
	}

	closeProductDetail() {
		this.refs.modalProduct.close();
	}

	openProductDetail() {
		this.refs.modalProduct.open();
	}

	openProduct() {
		AppEventEmitter.emit('open.product.click');
	}

	closeProduct() {
		AppEventEmitter.emit('close.product.click');
	}

	getDescription(desc) {
		return desc.replace('<p>', '').substring(0, 200);
	}

	render() {
		const productDetail = (
			<View>
				<ScrollView style={{marginTop:5,marginBottom:40}}>
					<ProductSelector/>
				</ScrollView>
			</View>
		)

		const productSwipe = (
			<Swiper
				dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
				activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
				paginationStyle={{top: 300, left: 10}}>
				<View>
					<Image source={require('../../../images/detail2.jpg')} style={css.image} />
					{/*<Image source={{uri: this.props.product.images[0].src}} style={css.image} />*/}
				</View>
				<View>
					<Image source={require('../../../images/detail2.jpg')} style={css.image} />
				</View>
				<View>
					<Image source={require('../../../images/detail3.jpg')} style={css.image} />
				</View>
				<View>
					<Image source={require('../../../images/detail4.jpg')} style={css.image} />
				</View>
			</Swiper>

		);

		return (
			<View style={product.color}>
				<ParallaxScrollView
					backgroundColor="#eee"
					contentBackgroundColor="white"
					parallaxHeaderHeight={500}
					renderFixedHeader={() => (
						<Toolbar name="Product detail" action={Actions.restaurant} isChild={true} cartButton={true}/>
					)}
					renderBackground={() => (
						<View style={{marginTop: 60}}>
							<Image style={product.productItem} source={require('../../../images/detail2.jpg')}  />
							{/*<Image style={product.productItem} source={{uri: this.props.product.images[0].src}}  />*/}
						</View>
					)}
					renderForeground={() => (
						<View style={product.detailPanel}>
							<View style={product.detailBlock}>
								<TouchableOpacity style={product.iconZoom} onPress={this.openProduct}>
									<Image source={require('../../../images/icon-zoom-out.png')} style={css.imageIcon} />
								</TouchableOpacity>

								<Text style={product.detailPrice}>$123 <Text style={product.detailFullPrice}>$123</Text></Text>
								<Text style={product.detailName}>name</Text>
								<Text style={product.detailDesc}>{this.getDescription("description") }
								</Text>
							</View>
						</View>
					)}>
					<View>
						{productDetail}
					</View>
				</ParallaxScrollView>

				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
					<TouchableOpacity style={[product.detailsBtnFullWidth, css.backgroundColor]} onPress={Actions.restaurant}>
						<Text style={[product.detailsBtnTxt,{color:'white'}]}>ADD TO CART</Text>
					</TouchableOpacity>
				</View>

				<Modal ref={"modalProduct"} swipeToClose={false} animationDuration={200}>
					<View style={css.modal}>
						{productSwipe}
						<TouchableOpacity style={product.iconZoom} onPress={this.closeProduct}>
							<Image source={require('../../../images/icon-zoom-in.png')}
							       style={[css.imageIcon, {top: 2, right: 4}]} />
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}
