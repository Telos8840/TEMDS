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
	TouchableWithoutFeedback,
	TouchableOpacity,
	Platform,
	Dimensions,
	DeviceEventEmitter,
	StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class MenuOption extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isChecked: false
		};
	}

	onChange() {
		this.setState({
			isChecked: !this.state.isChecked
		});

		this.props.onPress(this.props.object, this.props.optionId, !this.state.isChecked);
	}

	render() {
		return (
			<View style={[Style.radioWrap, Style.rowStyle]}>
				<TouchableOpacity style={Style.menuContainer} onPress={this.onChange.bind(this)}>
					<Icon name={this.state.isChecked ? 'check-square' : 'square-o'} style={Style.icon}/>
				</TouchableOpacity>
				<TouchableWithoutFeedback style={Style.textContainer} onPress={this.onChange.bind(this)}>
					<View style={Style.textContainer}>
						<Text style={ Style.radioLabel }>
							{ this.props.object.option }
						</Text>
						<Text style={ Style.radioLabel }>
							+${ this.props.object.price }
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>

		);
	}
}

const Style = StyleSheet.create({
	radioWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		marginRight: 15,
		marginLeft: 10,
	},

	radioLabel: {
		color: '#212121',
		fontSize: 16
	},

	labelWrapStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},

	labelVerticalWrap: {
		flexDirection: 'column',
		paddingLeft: 10,
	},

	labelVertical: {
		paddingLeft: 0,
	},

	formHorizontal: {
		flexDirection: 'row',

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
	rowStyle: {
		paddingVertical: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderTopColor: 'white',
		borderLeftColor: 'white',
		borderRightColor: 'white',
		borderBottomColor: '#dddddd',
		borderWidth: 1
	},
	icon: {
		width: 20,
		color: '#727272',
		fontSize: 22,
	}
});