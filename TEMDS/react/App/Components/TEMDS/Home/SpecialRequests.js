/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {
	ListView,
	TextInput,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet
} from "react-native";

import shipping from "../../Styles/shipping";
import {Actions} from "react-native-router-flux";
import AddItemsList from "./AddItemList";
import product from "../../Styles/product";
import css from "../../Styles/style";


export default class SpecialRequests extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={shipping.layout}>
				<ScrollView>
					<View style={shipping.card}>
						<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={shipping.input} placeholder={'Business Name'}/>
						<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={shipping.input} placeholder={'Address'}/>
						<View style={shipping.inputContainer}>
							<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={shipping.inputHalf} placeholder={'City'}/>
							<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={shipping.inputHalf} placeholder={'ZIP Code'}/>
						</View>
						<TextInput
							multiline = {true}
							numberOfLines = {4}
							editable = {true}
							underlineColorAndroid='rgba(0,0,0,0)'
							style={css.multiLineInput}
							placeholder={'Comments'}
						/>
						<AddItemsList />
					</View>
				</ScrollView>
				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>

					<TouchableOpacity style={[product.detailsBtn,{backgroundColor:'#eee'}]}>
						<Text style={[product.detailsBtnTxt,{color:'#494949'}]}>CANCEL</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[product.detailsBtn, css.backgroundColor]} onPress={Actions.cart}>
						<Text style={[product.detailsBtnTxt,{color:'white'}]}>SUBMIT</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
