/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {Text, View, Dimensions, StyleSheet, PixelRatio, Image, ListView, TouchableOpacity} from "react-native";
import styles from "./restaurant-list";
import Parallax from "react-native-parallax";
import {Actions} from "react-native-router-flux";


const SCROLLVIEW = 'Parallax_scroll';
const PARALLAX_FACTOR = 0.2;

export default class ProductList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const goToCategory = (category) => {
			this.props.selectCategory(category.id);
			Actions.product({productId: category.id, title: category.name});
		};

		return (
			<Parallax.ScrollView style={styles.scrollView}>
				{this.props.restaurants.map((restaurant, i) => (
					<Parallax.Image
						key={i}
						style={styles.image}
						overlayStyle={styles.overlay}
						source={{uri: restaurant.image}}
						parallaxFactor={PARALLAX_FACTOR}
						onPress={() => goToCategory(restaurant)} >
						<Text style={styles.title}>{restaurant.name}</Text>
						<Text style={styles.description}>{restaurant.category}</Text>
					</Parallax.Image>
				))}
			</Parallax.ScrollView>
		);
	}
}

