/**
 * Created by Saul on 10/29/16.
 */

import React, {Component} from "react";
import {View, Image, ScrollView} from "react-native";
import Item from './Item';

import styles from './styles';

const MenuItems = (props) => {

	return (
		<ScrollView style={styles.scrollView}
		            directionalLockEnabled={true}
		            horizontal={true}>

			<View style={{flexDirection:'row'}}>
				{props.items.map((item, i) => (
					<Item
						key={i}
						id={item.id}
						name={item.name}
						price={item.price}
						image={item.image}
						selectDetail={props.selectDetail} />
				))}
			</View>
		</ScrollView>
	);
};

export default MenuItems;