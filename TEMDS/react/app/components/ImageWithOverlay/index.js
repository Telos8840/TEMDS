'use strict';

import React, {Component} from "react";
import {View, StyleSheet, Image} from "react-native";

const SALE_ICON_SMALL = require('../../images/icon-sale-48x48.png');
const SALE_ICON_BIG = require('../../images/sale-icon-96x96.png');

export default class RatingStar extends Component {
    render() {
        let icon = SALE_ICON_SMALL;
        if (this.props.size != undefined && this.props.size == 'big') icon = SALE_ICON_BIG;

        return (
            <Image source={icon} style={styles.hover_top_right}></Image>
        );
    }
}

const styles = StyleSheet.create({
    hover_top_right: { position: 'absolute', top: 0, right: 0 }
});