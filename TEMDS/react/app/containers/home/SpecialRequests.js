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
	StyleSheet,
	Dimensions
} from "react-native";
const {width} = Dimensions.get("window");

// import shipping from "../../Styles/shipping";
 import {Actions} from "react-native-router-flux";
 import AddItemsList from "./AddItemList";
// import product from "../../Styles/product";
// import css from "../../Styles/style";


export default class SpecialRequests extends Component {
	constructor(props) {
		super(props);

		this.styles = {
			container: {
				flex: 1,
				backgroundColor: "white"
			},
			card: {
				backgroundColor: "white",
				width: width-20,
				marginLeft: 10,
				marginRight: 10,
				marginTop: 5,
				marginBottom: 5
			},
			input: {
				height: 40,
				borderColor: "#ddd",
				borderWidth: 1,
				fontSize: 14,
				paddingTop: 4,
				paddingRight: 4,
				paddingBottom: 4,
				paddingLeft: 8,
				borderRadius: 4,
				marginLeft: 20,
				marginRight: 20,
				marginBottom: 8,
				color: "#333"
			},
			inputContainer: {
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-between",
				width: width - 60,
				marginLeft: 20,
				marginRight: 20
			},
			inputHalf: {
				width: width/2 - 40,
				alignSelf: "flex-start",
				height: 40,
				borderColor: "#ddd",
				borderWidth: 1,
				fontSize: 14,
				paddingTop: 4,
				paddingRight: 4,
				paddingBottom: 4,
				paddingLeft: 8,
				borderRadius: 4,
				marginBottom: 8,
				color: "#333"
			},
			multiLineInput: {
				height: 80,
				borderColor: "#ddd",
				borderWidth: 1,
				fontSize: 14,
				paddingTop: 4,
				paddingRight: 4,
				paddingBottom: 4,
				paddingLeft: 8,
				borderRadius: 4,
				marginLeft: 20,
				marginRight: 20,
				marginBottom: 8,
				color: "#333",
			},
			detailsBtnTxt: {
				fontSize: 12,
				fontWeight: '600'
			},
			detailsBtn: {
				width: width/2,
				height: 40,
				alignItems: "center",
				justifyContent: "center"
			},
		}
	}

	render() {
		return (
			<View style={this.styles.container}>
				<ScrollView>
					<View style={this.styles.card}>
						<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={this.styles.input} placeholder={'Business Name'}/>
						<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={this.styles.input} placeholder={'Address'}/>
						<View style={this.styles.inputContainer}>
							<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={this.styles.inputHalf} placeholder={'City'}/>
							<TextInput underlineColorAndroid='rgba(0,0,0,0)' style={this.styles.inputHalf} placeholder={'ZIP Code'}/>
						</View>
						<TextInput
							multiline = {true}
							numberOfLines = {4}
							editable = {true}
							underlineColorAndroid='rgba(0,0,0,0)'
							style={this.styles.multiLineInput}
							placeholder={'Comments'}
						/>
						<AddItemsList />
					</View>
				</ScrollView>
				<View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>

					<TouchableOpacity style={[this.styles.detailsBtn,{backgroundColor:'#eee'}]}>
						<Text style={[this.styles.detailsBtnTxt,{color:'#494949'}]}>CANCEL</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[this.styles.detailsBtn, {backgroundColor: "#1CAADE"}]} onPress={Actions.cart}>
						<Text style={[this.styles.detailsBtnTxt,{color:'white'}]}>SUBMIT</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
