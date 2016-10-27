/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {Text, View, Image, ListView, TouchableOpacity, ScrollView, Animated, RefreshControl} from "react-native";
import Swiper from "react-native-swiper";
import css from "../../Styles/style";
const restaurant = require('./restaurant.js').default;
import Product from './Product';
import Toolbar from "../../Controls/Toolbar";

let offset = 0,
	alpha = 100,
	beta = 50;

export default class RestaurantView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_animatedMenu: new Animated.Value(0),
			isRefreshing: false
		}
	}

	open() {
		AppEventEmitter.emit('hamburger.click');
	}

	hideMenu() {
		Animated.spring(this.state._animatedMenu, {
			toValue: -120
		}).start();
	}

	showMenu() {
		Animated.spring(this.state._animatedMenu, {
			toValue: 0
		}).start();
	}

	componentDidMount() {
		this._onRefresh()
	}

	onScroll(event) {
		var currentOffset = event.nativeEvent.contentOffset.y;

		if (currentOffset < alpha) {
			return;
		}

		if (Math.abs(offset - currentOffset) <= beta)
			return;

		if (this.state.isRefreshing) {
			return;
		}

		if (currentOffset > offset) {
			this.hideMenu();
		} else if (currentOffset < offset) {
			this.showMenu();
		}

		offset = currentOffset;
	}

	_onRefresh = () => {
		this.hideMenu();

		this.setState({
			isRefreshing: true
		});

		setTimeout(() => {
			this.showMenu();

			this.setState({
				loaded: this.state.loaded + 10,
				isRefreshing: false,
			});
		}, 1000);
	};

	render() {
		const swipeView = (
			<View style={{marginTop: 60}}>
				<Image source={require('../../../images/man1.png')} style={restaurant.image}>
					<Swiper dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
					        activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
					        paginationStyle={{top: -300, left: 300}} >
						<View>
							<Image source={require('../../../images/man1.png')} style={restaurant.image} />
						</View>
						<View>
							<Image source={require('../../../images/man2.png')} style={restaurant.image} />
						</View>
						<View>
							<Image source={require('../../../images/man3.png')} style={restaurant.image} />
						</View>
					</Swiper>
				</Image>
			</View>
		);

		const scrollView = (
			<ScrollView style={restaurant.scrollView}
			            directionalLockEnabled={true}
			            horizontal={true}>

				<View style={{flexDirection:'row'}}>
					<Product name="New Balance 530 Multi Trainers" price="120$" imageURL={require('../../../images/man-s1.png')} />
					<Product name="Dark Future Drop Crotch Jeans" price="110$" imageURL={require('../../../images/man-s2.png')} />
					<Product name="Spitfire Post Punk Round" price="110$" imageURL={require('../../../images/man-s3.png')} />
					<Product name="Puma Throwbacks Sweat Shorts" price="110$" imageURL={require('../../../images/man-s4.png')} />
					<Product name="Sweat Shorts Adidas" price="110$" imageURL={require('../../../images/man-s5.png')} />
				</View>
			</ScrollView>
		);

		const scrollView2 = (
			<ScrollView style={restaurant.scrollView}
			            directionalLockEnabled={true}
			            horizontal={true}>

				<View style={{flexDirection:'row'}}>
					<Product name="what deal evil rent by real" price="110$" imageURL={require('../../../images/man-s6.png')} />
					<Product name="literature to or an sympathize" price="110$" imageURL={require('../../../images/man-s4.png')} />
					<Product name="Way advantage age led" price="110$" imageURL={require('../../../images/man-s5.png')} />
					<Product name="what deal evil rent by real in" price="110$" imageURL={require('../../../images/man-s3.png')} />
				</View>
			</ScrollView>
		);


		return (
			<View style={restaurant.color}>
				<Animated.View style={[css.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
					<Toolbar name="Product" isChild={true} cartButton={true}/>
				</Animated.View>

				<ScrollView onScroll={this.onScroll.bind(this)} scrollEventThrottle={30}
				            refreshControl={<RefreshControl
					            refreshing={this.state.isRefreshing}
					            onRefresh={this._onRefresh}
					            tintColor="#333"
					            title="Loading..."
					            titleColor="#333"
					            colors={['#333', '#999', '#ddd']}
					            progressBackgroundColor="#ffff00" /> }>
					{swipeView}
					<View>
						<Text style={restaurant.title}>BEST SELLER</Text>
					</View>
					{scrollView}
					<View>
						<Text style={restaurant.title}>POPULAR</Text>
					</View>
					{scrollView2}
					<View>
						<Text style={restaurant.title}>LATEST COLLECTIONS</Text>
					</View>
					{scrollView}
				</ScrollView>
			</View>
		);
	}
}

