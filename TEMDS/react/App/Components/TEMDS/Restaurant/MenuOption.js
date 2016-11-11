/**
 * Created by Saul on 11/6/16.
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
import Icon from "react-native-vector-icons/FontAwesome";

export default class MenuOption extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: props.type == 0 ? 'square-o' : 'circle-thin',
			checked: props.checked
		};

		console.log('props', props);
	}

	onChange() {
		if (this.props.type == 0) { // option type
			this.setState({
				type: !this.state.checked ? 'check-square' : 'square-o',
				checked: !this.state.checked
			});
		} else if (this.props.type == 1) { // required type
			this.setState({
				type: !this.state.checked ? 'check-circle' : 'circle-thin',
				checked: !this.state.checked
			});
		}

	}

	render() {
		return (
			<TouchableOpacity style={this.props.style.menuContainer} onPress={this.onChange.bind(this)}>
				<Icon name={this.state.type} style={this.props.style.icon}/>
				<View style={this.props.style.textContainer}>
					<Text style={ this.props.style.rowText }>
						{ this.props.option }
					</Text>
					<Text style={ this.props.style.rowText }>
						+${ this.props.price }
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
