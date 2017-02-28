/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {Text, View, Image, ListView, TouchableOpacity, ScrollView, Animated, RefreshControl} from "react-native";
import styles from './styles.js';
import MenuItems from './MenuItems';
import Toolbar from "./../../components/Toolbar";
import LogoSpinner from "./../../components/LogoSpinner";
import {fetchProductById} from '../../reducers/Product/actions';
import {selectDetail} from '../../reducers/Detail/actions'
import EventEmitter from './../../utils/AppEventEmitter';
import TimerMixin from 'react-timer-mixin';
import Constants from './../../Constants';
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';

let offset = 0,
	alpha = 100,
	beta = 50;

class Product extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_animatedMenu: new Animated.Value(0),
			isWaiting: true,
			isRefreshing: false
		};

		//this.updatePrice = (props) => this.setState({price: props.price});
		console.log('prod props', props);
	}

	static propTypes = {

	};

	componentWillMount() {
		TimerMixin.setTimeout(() => this.props.fetchProductById(this.props.productId, () => this.setState({isWaiting: false})), 500);
	}

	componentWillUnmount() {
		//this.productChangePrice.remove();
	}

	componentDidMount() {
		//this.productChangePrice = EventEmitter.addListener(Constants.EmitCode.ProductPriceChanged, this.updatePrice.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		const {product} = nextProps;
		if (product !== undefined) {
			this.setState({price: product.price});
		}
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

	onScroll(event) {
		let currentOffset = event.nativeEvent.contentOffset.y;

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

	goToDetail(id, name) {
		this.props.selectDetail(id, name);
		Actions.detail({productId: id, title: name});
	}

	render() {
		if (this.state.isWaiting)
			return <LogoSpinner fullStretch/>;

		this._product = this.props.product;

		return (
			<View style={styles.color}>
				<Animated.View style={[styles.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
					<Toolbar {...this.props}/>
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
						<Image source={{uri: this._product.mainImage}} style={styles.image} />
					</View>

					{
						this._product.menu.map((menu, i) => (
							<View key={i}>
								<View>
									<Text style={styles.title}>{menu.title}</Text>
								</View>
								<MenuItems items={menu.items} selectDetail={this.goToDetail.bind(this)} />
							</View>
						))
					}

				</ScrollView>
			</View>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		currentProduct: state.Product.currentProduct,
		product: state.Product.currentProduct.product
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProductById: (productId, callback) => {
			dispatch(fetchProductById(productId, callback));
		},
		selectDetail: (selectedDetailId, selectedDetailName) => {
			dispatch(selectDetail(selectedDetailId, selectedDetailName));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

