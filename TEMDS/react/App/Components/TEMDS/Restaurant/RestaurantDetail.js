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
import cart from "../../Styles/cart";
import Toolbar from "../../Controls/Toolbar";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import product from "../../Styles/product";
import Modal from "react-native-modalbox";
import AppEventEmitter from "../../../Services/AppEventEmitter";
import Swiper from "../../../../node_modules/react-native-swiper";
import Icon from "react-native-vector-icons/EvilIcons";
import ProductSelector from "./ProductSelector";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestaurantActions from '../../../actions/RestaurantAction';

let deviceWidth = Dimensions.get('window').width,
	details = null;



class RestaurantDetail extends Component {
	/*constructor(props) {
	 super(props);

	 var dataSource = new ListView.DataSource({
	 rowHasChanged: (r1, r2) => r1 !== r2,
	 sectionHeaderHasChanged: (s1, s2) => s1 !== s2
	 });

	 this.state = {
	 selected1: 'key1',
	 dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap())
	 };

	 this.props.actions.getRestaurantDetail();

	 console.log('const detail', props);
	 }

	 componentWillReceiveProps(nextProps) {
	 details = nextProps.detail;
	 console.log('detail', details);
	 }

	 onValueChange(key, value) {
	 const newState = {};
	 newState[key] = value;
	 this.setState(newState);
	 }


	 convertFoodArrayToMap() {
	 var foodCategoryMap = {}; // Create the blank map
	 var food = [
	 {name: 'Lettuce', category: 'Vegetable'},
	 {name: 'Apple', category: 'Fruit'},
	 {name: "Orange", category: "Fruit"},
	 {name: "Potato", category: "Vegetable"}
	 ];
	 food.forEach(function(foodItem) {
	 if (!foodCategoryMap[foodItem.category]) {
	 // Create an entry in the map for the category if it hasn't yet been created
	 foodCategoryMap[foodItem.category] = [];
	 }

	 foodCategoryMap[foodItem.category].push(foodItem);

	 });

	 return foodCategoryMap;

	 }

	 renderRow(foodItem) {
	 return (
	 <Text>{foodItem.name}</Text>
	 )
	 }

	 renderSectionHeader(sectionData, category) {
	 return (
	 <Text style={{fontWeight: "700"}}>{category}</Text>
	 )
	 }

	 render() {
	 const productDetail = (
	 <View>
	 <ScrollView style={{marginTop:5,marginBottom:40}}>
	 <ProductSelector/>
	 </ScrollView>
	 </View>
	 );

	 const productSwipe = (
	 <Swiper
	 dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
	 activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
	 paginationStyle={{top: 300, left: 10}}>
	 <View>
	 <Image source={require('../../../images/detail2.jpg')} style={css.image} />
	 {/!*<Image source={{uri: this.props.product.images[0].src}} style={css.image} />*!/}
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
	 details &&
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
	 {/!*<View>
	 {productDetail}
	 </View>*!/}
	 <ListView
	 dataSource={this.state.dataSource}
	 renderRow={this.renderRow}
	 renderSectionHeader={this.renderSectionHeader}
	 />
	 </ParallaxScrollView>

	 <View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
	 <TouchableOpacity style={[product.detailsBtnFullWidth, css.backgroundColor]} onPress={Actions.restaurant}>
	 <Text style={[product.detailsBtnTxt,{color:'white'}]}>ADD TO CART</Text>
	 </TouchableOpacity>
	 </View>
	 </View>
	 );
	 }*/
	constructor(props) {
		super(props);
		this.state =  {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}).cloneWithRows([
				'Simplicity Matters',
				'Hammock Driven Development',
				'Value of Values',
				'Are We There Yet?',
				'The Language of the System',
				'Design, Composition, and Performance',
				'Clojure core.async',
				'The Functional Database',
				'Deconstructing the Database',
				'Hammock Driven Development',
				'Value of Values'
			])
		};

		this.props.actions.getRestaurantDetail();
	}

	componentWillReceiveProps(nextProps) {
		details = nextProps.detail;
		console.log('detail', details);
	}

	render() {
		const { onScroll = () => {} } = this.props;
		return (
			details &&
			<View style={product.color}>
				<ListView
					ref="ListView"
					style={styles.container}
					dataSource={ this.state.dataSource }
					renderRow={(rowData) => (
						<View key={rowData} style={cart.cards}>
							<TouchableOpacity style={{
								"left": -2,
								"top": 2,
								"position": "absolute"
							}}>
								<Icon name={"check"} style={[css.icon32, cart.iconClose, cart.active]}/>
							</TouchableOpacity>
							<View style={{flexDirection: 'row'}}>
								<Text style={ cart.name }>
									{ rowData }
								</Text>
							</View>
						</View>
					)}
					renderScrollComponent={props => (
						<ParallaxScrollView
							//onScroll={onScroll}

							backgroundColor="white"
							contentBackgroundColor="white"
							parallaxHeaderHeight={deviceWidth}

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
							)}

							renderFixedHeader={() => (
								<Toolbar name={details.name} action={Actions.restaurant} isChild={true} cartButton={true}/>
							)}/>
					)}
				/>
				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
					<TouchableOpacity style={[product.detailsBtnFullWidth, css.backgroundColor]} onPress={Actions.restaurant}>
						<Text style={[product.detailsBtnTxt,{color:'white'}]}>ADD TO CART</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	console.log('mapping state in detail', state);
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
