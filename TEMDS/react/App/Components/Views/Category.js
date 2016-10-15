'use strict';

import React, {Component} from "react";
import {Text, View, Dimensions, StyleSheet, PixelRatio, Image, ListView, TouchableOpacity} from "react-native";
import styles from "./../Styles/category";
import Parallax from "react-native-parallax";

var SCROLLVIEW = 'Parallax_scroll';
var PARALLAX_FACTOR = 0.8;
var SECTIONS = [
    {
        title: 'B A G S',
        number: '2990',
        keyword: require("../../images/cate1.png"),
    },
    {
        title: 'S H O E S',
        number: '23900',
        keyword: require('../../images/cate2.png'),
    },
    {
        title: 'S U I T S',
        number: '99',
        keyword: require('../../images/cate3.png'),
    },
    {
        title: 'A C C E S S O R I E S',
        number: '3320',
        keyword: require('../../images/cate4.png'),
    },
    {
        title: 'L O R E M  I P S U M',
        number: '360',
        keyword: require('../../images/cate5.png'),
    },
    {
        title: 'C O N S E C T E T U R',
        number: '340',
        keyword: require('../../images/cate6.png'),
    },
    {
        title: 'A D I P I S I C I N G',
        number: '430',
        keyword: require('../../images/cate7.png'),
    }
];

export default class Category extends Component {
    render() {
        return (
            <Parallax.ScrollView ref={SCROLLVIEW} style={styles.scrollView}>
                {SECTIONS.map((section, i) => (
                    <Parallax.Image
                        key={i}
                        style={styles.image}
                        overlayStyle={styles.overlay}
                        source={section.keyword}
                        parallaxFactor={PARALLAX_FACTOR}>
                        <Text style={styles.title}>{section.title}</Text>
                        <Text style={styles.description}>{section.number} products</Text>
                    </Parallax.Image>
                ))}
            </Parallax.ScrollView>
        );
    }
}
