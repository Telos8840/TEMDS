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
import Modal from "react-native-modalbox";
import AppEventEmitter from "../../../Services/AppEventEmitter";
import Swiper from "../../../../node_modules/react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductSelector from "./ProductSelector";
import MenuOption from "./MenuOption";


import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';
import { Container, Content, List, ListItem, Text, Radio } from 'native-base';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestaurantActions from '../../../actions/RestaurantAction';

let deviceWidth = Dimensions.get('window').width,
	details = null;

// const options = [
// 	'So',
// 	'Many',
// 	'Choices',
// 	'It',
// 	'Is',
// 	'Hard',
// 	'To',
// 	'Pick',
// 	'One',
// ];

class RestaurantDetail extends Component {
	constructor(props) {
		super(props);

		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
		});


		this.state = {
			selected1: 'key1',
			dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap()),
			rowOptions: [],
			selectedOption: {}
		};

		this.props.actions.getRestaurantDetail();

		console.log('const detail', props);


	}

	componentWillReceiveProps(nextProps) {
		details = nextProps.detail;
		console.log('detail', details);
		this.setState({
			rowOptions : details.menuOptions
		});
		console.log('state detssss', this.state);
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

		function setSelectedOption(selectedOption){
			this.setState({
				selectedOption
			});
		}

		function renderOption(option, selected, onSelect, index){
			const style = selected ? { fontWeight: 'bold'} : {};
			console.log('option', option);

			return (
				<TouchableWithoutFeedback onPress={onSelect} key={index}>
					{/*<Text style={style}>{option} shit</Text>*/}
					<MenuOption style={styles}
					            type={option.type}
					            option={option.option}
					            price={option.price}
					            checked={option.checked} />
				</TouchableWithoutFeedback>
			);
		}

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
					{/*<View>
					 {productDetail}
					 </View>*/}
					{/*<ListView
						dataSource={this.state.dataSource}
						renderRow={this.renderRow}
						renderSectionHeader={this.renderSectionHeader}
					/>*/}
					<Content>
						<SegmentedControls
							direction={'column'}
							options={ details.menuOptions }
							onSelection={ setSelectedOption.bind(this) }
							selectedOption={this.state.selectedOption }
							renderOption={ renderOption }
						/>
					</Content>
				</ParallaxScrollView>

				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
					<TouchableOpacity style={[product.detailsBtnFullWidth, css.backgroundColor]} onPress={Actions.restaurant}>
						<Text style={[product.detailsBtnTxt,{color:'white'}]}>ADD TO CART</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}


	/*constructor(props) {
	 super(props);

	 var getSectionData = (dataBlob, sectionID) => {
	 return dataBlob[sectionID];
	 };

	 var getRowData = (dataBlob, sectionID, rowID) => {
	 return dataBlob[sectionID + ':' + rowID];
	 };

	 this.state =  {
	 loaded: false,
	 dataSource : new ListView.DataSource({
	 getSectionData          : getSectionData,
	 getRowData              : getRowData,
	 rowHasChanged           : (row1, row2) => row1 !== row2,
	 sectionHeaderHasChanged : (s1, s2) => s1 !== s2
	 })
	 };

	 this.regenDataSource = this.regenDataSource.bind(this);

	 props.actions.getRestaurantDetail();
	 }

	 componentWillReceiveProps(nextProps) {
	 details = nextProps.detail;
	 console.log('detail', details);
	 this.setDataSource(details);
	 }

	 setDataSource(data) {
	 var menuOptions = data.menuOptions,
	 length = menuOptions.length,
	 dataBlob = {},
	 sectionIDs = [],
	 rowIDs = [],
	 option,
	 options,
	 optionLength,
	 menu,
	 i,
	 j;

	 for (i = 0; i < length; i++) {
	 option = menuOptions[i];

	 sectionIDs.push(option.id);
	 dataBlob[option.id] = { title: option.title, type: option.type };

	 options = option.options;
	 optionLength = options.length;

	 rowIDs[i] = [];

	 for(j = 0; j < optionLength; j++) {
	 menu = options[j];
	 menu.checked = false;
	 rowIDs[i].push(menu.id);

	 dataBlob[option.id + ':' + menu.id] = menu;
	 }
	 }

	 this.setState({
	 dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
	 loaded     : true
	 });
	 }

	 renderSectionHeader(sectionData, sectionID) {
	 return (
	 <View style={styles.section}>
	 <Text style={styles.headerText}>{sectionData.title}</Text>
	 <Text style={styles.headerSubText}>({sectionData.type})</Text>
	 </View>
	 );
	 }

	 regenDataSource(data) {
	 console.log('regen', data);
	 }

	 renderSectionRow(rowData) {
	 return (
	 <View key={rowData} style={styles.rowStyle}>
	 <MenuOption style={styles}
	 type={rowData.type}
	 option={rowData.option}
	 price={rowData.price}
	 checked={rowData.checked} />
	 </View>
	 );
	 }

	 onRowChange(visibleRows, changedRows) {
	 console.log('shit changed!', visibleRows, changedRows);
	 }

	 render() {
	 return (
	 this.state.loaded &&
	 <View style={product.color}>
	 <ListView
	 ref="ListView"
	 dataSource={ this.state.dataSource }
	 renderRow={this.renderSectionRow}
	 renderSectionHeader = {this.renderSectionHeader}
	 onChangeVisibleRows = {this.onRowChange}
	 renderScrollComponent={props => (
	 <ParallaxScrollView
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
	 }*/
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
		color: '#555557',
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
		borderBottomColor: '#E0E0E0',
		borderWidth: 1
	},
	rowText: {
		color: '#212121',
		fontSize: 16
	},
	subText: {
		fontSize: 14,
		color: '#757575'
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
