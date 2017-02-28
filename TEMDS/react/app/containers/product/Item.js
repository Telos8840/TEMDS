'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Actions} from "react-native-router-flux";


import Constants from './../../Constants';
const width = Constants.Dimension.ScreenWidth();

const styles = {
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
};

const Item = (props) => {
        return (
            <TouchableOpacity onPress={() => props.selectDetail(props.id, props.name)}>
                <View style={styles.panel}>
                    <Image source={{uri: props.image}} style={styles.imagePanel} />
                </View>

                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>${props.price}</Text>
            </TouchableOpacity>
        );
};

export default Item