/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {Text, View, Image, ListView, TouchableOpacity, ScrollView, Animated, RefreshControl} from "react-native";
import css from "../../Styles/style";
const restaurantCSS = require('./restaurant.js').default;
import MenuItems from './MenuItems';
import Toolbar from "../../Controls/Toolbar";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestaurantActions from '../../../actions/RestaurantAction';

let offset = 0,
	alpha = 100,
	beta = 50;

let restaurant = null;

class RestaurantView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_animatedMenu: new Animated.Value(0),
			isRefreshing: false
		};


		this.props.actions.getRestaurantInfo();
	}

	componentWillReceiveProps(nextProps) {
		restaurant = nextProps.restaurant;
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
		return (
			restaurant &&
			<View style={restaurantCSS.color}>
				<Animated.View style={[css.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
					<Toolbar name={restaurant.name} isChild={true} cartButton={true}/>
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

					<View style={{marginTop: 60}}>
						<Image source={{uri: restaurant.mainImage}} style={restaurantCSS.image} />
					</View>

					{
						restaurant.menu.map((menu, i) => (
							<View key={i}>
								<View>
									<Text style={restaurantCSS.title}>{menu.title}</Text>
								</View>
								<MenuItems items={menu.items}/>
							</View>
						))
					}

				</ScrollView>
			</View>
		);
	}
}


function mapStateToProps(state) {
	console.log('mapping state in view', state);
	return {
		restaurant: state.restaurant.info
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			getRestaurantInfo: RestaurantActions.getRestaurantInfo
		}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantView);

