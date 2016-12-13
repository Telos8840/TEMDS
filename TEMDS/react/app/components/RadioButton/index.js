/**
 * Created by Saul on 11/12/16.
 */
'use strict';


const React = require('react');
const ReactNative = require('react-native');
var {
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	LayoutAnimation,
	StyleSheet
} = ReactNative;
import Icon from "react-native-vector-icons/FontAwesome";

var RadioForm = React.createClass({
	getInitialState: function () {
		return {
			is_active_index: this.props.initial
		}
	},

	getDefaultProps: function () {
		return {
			radio_props: [],
			initial: 0,
			buttonColor: '#2196f3',
			formHorizontal: false,
			labelHorizontal: true,
			animation: true,
			labelColor: '#000'
		}
	},

	updateIsActiveIndex: function(index) {
		this.setState({ is_active_index: index });
		this.props.onPress(this.props.radio_props[index], index);
	},

	_renderButton: function (obj, i) {
		return (
			<RadioButton
				isSelected={this.state.is_active_index === i}
				obj={obj}
				key={i}
				index={i}
				optionId={this.props.optionId}
				onPress={(value, index, optionId) => {
					this.props.onPress(value, index, optionId);
					this.setState({is_active_index: index});
				}}
			/>
		)
	},

	render: function () {
		var render_content = false;
		if (this.props.radio_props.length) {
			render_content = this.props.radio_props.map(this._renderButton);
			console.log('radio', this.props.radio_props);
		}

		return (
			<View>
				{render_content}
			</View>
		)
	}
});

var RadioButton = React.createClass({
	shouldComponentUpdate: function (nextProps, nextState) {
		return true;
	},

	getDefaultProps: function () {
		return {
			isSelected: false,
			buttonColor: '#2196f3',
			labelHorizontal: true
		}
	},

	componentWillUpdate () {
		if (this.props.animation) {
			LayoutAnimation.spring();
		}
	},

	render: function () {
		var c = this.props.children;
		var renderContent = false;
		renderContent = c ? (
			<View style={[
				Style.radioWrap,
				Style.rowStyle
			]}>
				{c}
			</View>
		) : (
			<View style={[
				Style.radioWrap,
				Style.rowStyle
			]}>
				<RadioButtonInput {...this.props} />
				<RadioButtonLabel {...this.props} />
			</View>
		);
		return (
			<View>
				{renderContent}
			</View>
		)
	}
});

export class RadioButtonInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isSelected: false,
		}
	}

	render () {
		return (
			<View>
				<TouchableOpacity
					style={Style.menuContainer}
					onPress={() => {
						this.props.onPress( this.props.obj, this.props.index, this.props.optionId)
					}
					}>
					<Icon name={this.props.isSelected ? 'check-circle' : 'circle-thin'} style={Style.icon}/>
				</TouchableOpacity>
			</View>
		)
	}
}

export class RadioButtonLabel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isSelected: false,
		}
	}

	render () {
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					this.props.onPress( this.props.obj, this.props.index, this.props.optionId)
				}}>
				<View style={[
					this.props.labelWrapStyle,
					Style.textContainer,
				]} >
					<Text style={[Style.radioLabel]}>{this.props.obj.option}</Text>
					<Text style={[Style.radioLabel]}>+${this.props.obj.price}</Text>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const Style = StyleSheet.create({
	radioForm: {
	},

	radioWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		marginRight: 15,
		marginLeft: 10,
	},
	radio: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		alignSelf: 'center',
		borderColor: '#2196f3',
		borderRadius: 30,
	},

	radioLabel: {
		color: '#212121',
		fontSize: 16
	},

	radioNormal: {
		borderRadius: 10,
	},

	radioActive: {
		width: 20,
		height: 20,
		backgroundColor: '#2196f3',
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

export default RadioForm
export {RadioButton}