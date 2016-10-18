'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Actions} from "react-native-router-flux";
const product = require('../../Styles/shop.js').default;

export default class Product extends Component {
    render() {
        return (
            <TouchableOpacity onPress={Actions.restaurantdetail}>
                <View style={product.panel}>
                    <Image source={this.props.imageURL} style={product.imagePanel} />
                </View>

                <Text style={product.name}>{this.props.name}</Text>
                <Text style={product.price}>{this.props.price}</Text>
            </TouchableOpacity>
        );
    }

}
