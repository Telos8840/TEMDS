/**
 * Created by Saul on 10/15/16.
 */

'use strict';

import React, {Component} from "react";
import {
	View, Text, Alert, AlertIOS, ListView, ListViewDataSource, StyleSheet,
	TouchableOpacity, InteractionManager, RefreshControl, Animated, Platform, Dimensions
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Button from "../../components/Button";
import DynamicListRow from "./DynamicListRow";
import Icon from 'react-native-vector-icons/Ionicons';


import Constants from './../../Constants';
const data = [];

export default class AddItemList extends Component {
	/**
	 * Default state values
	 * */
	state = {
		loading     : true,
		dataSource  : new ListView.DataSource({
			rowHasChanged : (row1, row2) => true
		}),
		refreshing  : false,
		rowToDelete : null
	};

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this._loadData()
		});
	}

	_loadData(refresh) {
		refresh && this.setState({
			refreshing : true
		});

		this.dataLoadSuccess({data : data});
	}

	dataLoadSuccess(result) {

		this._data = result.data;

		let ds = this.state.dataSource.cloneWithRows(this._data);

		this.setState({
			loading     : false,
			refreshing  : false,
			rowToDelete : -1,
			dataSource  : ds
		});
	}


	render() {
		return (
			<View>
				<Button
					onPress={()=> this._addItemPressed()}
					text="Add Item" style={{width: Constants.Dimension.ScreenWidth() - 60}}/>

				<View style={{marginTop: 20}}>
					<ListView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._loadData.bind(this, true)}
								tintColor="#00AEC7"
								title="Loading..."
								titleColor="#00AEC7"
								colors={['#FFF', '#FFF', '#FFF']}
								progressBackgroundColor="#00AEC7"

							/>
						}
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)}
					/>
				</View>

			</View>
		);
	}

	_renderRow(rowData, sectionID, rowID) {
		console.log(rowData.id === this.state.rowToDelete);
		return (
			<DynamicListRow
				remove={rowData.id === this.state.rowToDelete}
				onRemoving={this._onAfterRemovingElement.bind(this)} >
				<View style={styles.rowStyle}>
					<View style={styles.contact}>
						<Text style={[styles.name]}>{rowData.name}</Text>
					</View>
					<TouchableOpacity style={styles.deleteWrapper} onPress={() => this._deleteItem(rowData.id)}>
						<Icon name='md-remove-circle' style={styles.deleteIcon}/>
					</TouchableOpacity>
				</View>
			</DynamicListRow>
		);
	}

	_addItemPressed() {

		AlertIOS.prompt(
			'Item Name',
			null,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text    : 'Add',
					onPress : (name) => {
						this._addItem(name);
					}
				}

			],
			'plain-text',
			''
		);
	}

	_addItem(name) {
		this._data.push({
			id    : name + Math.random(),
			name  : name
		});
		this.setState({
			rowToDelete : -1,
			dataSource  : this.state.dataSource.cloneWithRows(this._data)
		});
	}

	componentWillUpdate(nexProps, nexState) {
		if (nexState.rowToDelete !== null) {
			this._data = this._data.filter((item) => {
				if (item.id !== nexState.rowToDelete) {
					return item;
				}
			});
		}
	}

	_deleteItem(id) {
		this.setState({
			rowToDelete : id
		});
	}

	_onAfterRemovingElement() {
		this.setState({
			rowToDelete : null,
			dataSource  : this.state.dataSource.cloneWithRows(this._data)
		});
	}

}

const styles = StyleSheet.create({
	rowStyle: {
		backgroundColor   : '#FFF',
		paddingHorizontal : 10,
		borderBottomColor : '#ccc',
		borderBottomWidth : 1,
		flexDirection     : 'row',
		justifyContent: 'space-between'
	},
	rowIcon: {
		width            : 30,
		alignSelf        : 'flex-start',
		marginHorizontal : 10,
		fontSize         : 24
	},
	name: {
		color    : '#212121',
		fontSize : 18
	},
	contact: {
		width     : window.width - 100,
		alignSelf : 'flex-start',
		paddingVertical : 10,
	},
	deleteWrapper: {
		paddingVertical : 10,
		alignSelf       : 'flex-end'
	},
	deleteIcon: {
		fontSize  : 24,
		color     : '#DA281C',
		alignSelf : 'center'
	}
});