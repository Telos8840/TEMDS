/**
 * Created by Saul on 10/16/16.
 */

'use strict';

import React, {Component} from "react";
import {
	TextInput,
	Text,
	View,
	Image,
	StatusBarIOS,
	ScrollView,
	TouchableOpacity,
	Platform,
	Dimensions,
	DeviceEventEmitter
} from "react-native";
import cart from "../../Styles/cart";
import css from "./restaurant";

export default class ProductSelector extends Component {
	render() {
		const buttonList = <View style={cart.buttonPanel}>
			<View style={cart.buttons}>
				<TouchableOpacity>
					<Text style={cart.numberItem}>+</Text>
				</TouchableOpacity>
				<Text style={[cart.numberItem, cart.numberText]}>1</Text>
				<TouchableOpacity>
					<Text style={cart.numberItem}>-</Text>
				</TouchableOpacity>
			</View>
		</View>;

		return (
			<View>
				<View style={{flexDirection: 'row'}}>

						<TextInput
							multiline = {true}
							numberOfLines = {4}
							editable = {true}
							underlineColorAndroid='rgba(0,0,0,0)'
							style={css.input}
							placeholder={'Special Instructions'}
						/>
					{ buttonList }
				</View>
			</View>
		);
	}
}
