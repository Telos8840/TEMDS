'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Actions} from "react-native-router-flux";


import Constants from './../../Constants';
const width = Constants.Dimension.ScreenWidth();

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.styles = {
	        "panel": {
		        "alignItems": "center",
		        "justifyContent": "center",
		        "marginTop": 5,
		        "marginRight": 5,
		        "marginBottom": 5,
		        "marginLeft": 5,
		        "position": "relative",
		        "width": (width/3)-10,
		        "height": (width/3)
	        },
	        "imagePanel": {
		        "position": "absolute",
		        "width": (width/3)-10,
		        "height": (width/3),
		        "top": 0
	        },
	        "name": {
		        "textAlign": "center",
		        "fontSize": 13,
		        "width": (width/3)-15,
		        "paddingLeft": 6,
		        "paddingTop": 6
	        },
	        "price": {
		        "color": "#999",
		        "fontSize": 12,
		        "textAlign": "center",
		        "paddingTop": 6
	        }
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => Actions.detail(this.props.id)}>
                <View style={this.styles.panel}>
                    <Image source={{uri: this.props.image}} style={this.styles.imagePanel} />
                </View>

                <Text style={this.styles.name}>{this.props.name}</Text>
                <Text style={this.styles.price}>${this.props.price}</Text>
            </TouchableOpacity>
        );
    }
}