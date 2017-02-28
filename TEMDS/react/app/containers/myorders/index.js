'use strict';

import React, {Component, PropTypes} from 'react';
import {ListView, Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';

import Toolbar from "./../../components/Toolbar";
import LogoSpinner from "./../../components/LogoSpinner";
import Constants from './../../Constants';
import Languages from './../../Languages';
import WooWorker from '../../services/WooWorker'

const cardMargin = Constants.Dimension.ScreenWidth(0.05);

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            isLoading: false,       // Flag to know we are retrieving product data or not.
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        }
    }

    static propTypes = {
        customer: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.fetchProductsData();
    }

    fetchProductsData() {
        if (this.props.customer.id == undefined) return;
        let self = this;
        self.setState({isLoading: true});
        WooWorker.ordersByCustomerId(this.props.customer.id, (data) => {
            self.data = self.data.concat(data);
            // data.forEach((part, index, theArray) => {
            //     part.viewMode = self.state.currentMode;
            // });
            self.setState({
                dataSource: self.getDataSource(self.data),
                isLoading: false
            });
        })
    }

    getDataSource(products) {
        return this.state.dataSource.cloneWithRows(products);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F0F0F0'}}>
                <Toolbar {...this.props}/>
                {this.state.isLoading ? <LogoSpinner fullStretch/> :
                    <View style={{flex: 1}}>
                        {this.state.dataSource.getRowCount() == 0 ? this.renderError("You don't have any orders") :
                            <ListView contentContainerStyle={{backgroundColor: '#F0F0F0'} }
                                      dataSource={this.state.dataSource}
                                      renderRow={this.renderRow}
                                      enableEmptySections>
                            </ListView>}
                    </View>}
            </View>
        );
    }

    renderRow(_order) {
        let dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true})
        let getDataSource = (products) => dataSource.cloneWithRows(products)
        let dataSource2 = getDataSource(_order.line_items)

        let renderAttribute = (label, context, _style = {fontSize: 16}) => {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {label}
                    </Text>
                    <Text style={_style}>
                        {context}
                    </Text>
                </View>);
        }

        let dateFormat = (date) => {
            // const format = 'yyyy-mm-dd';
            const year = date.substr(0, 4);
            const month = date.substr(5, 2);
            const day = date.substr(8, 2);
            return day + '/' + month + '/' + year;
        }

        return (
            <View style={{margin: cardMargin, marginBottom: 0}}>
                <View style={{backgroundColor: Constants.Color.ButtonBackground}}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: Constants.Color.ButtonText,
                        fontSize: 20,
                        padding: 5,
                        paddingLeft: 10
                    }}>
                        Order Number #{_order.number}
                    </Text>
                </View>
                <View style={{padding: 5, backgroundColor: 'white'}}>
                    {renderAttribute("Order Date: ", dateFormat(_order.date_created))}
                    {renderAttribute("Status: ", _order.status.toUpperCase())}
                    {renderAttribute("Payment method: ", _order.payment_method_title)}
                    {renderAttribute("Total: ", _order.total + " " + _order.currency, {
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: Constants.Color.ProductPrice
                    })}

                    <Accordion
                        underlayColor="transparent"
                        sections={[{}]}
                        renderHeader={(section)=> {
                            return (
                                <View style={{flex: 1, height: 30, alignItems: 'flex-end'}}>
                                    <Text style={{fontSize: 16, textDecorationLine: 'underline'}}>Order details</Text>
                                </View>
                            );
                        }}
                        renderContent={(section) => {
                            return (
                                <ListView contentContainerStyle={{backgroundColor: 'white'} }
                                          dataSource={dataSource2}
                                          enableEmptySections={true}
                                          renderRow={(product) => <View
                                              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                              <Text style={{margin: 4, width: Constants.Dimension.ScreenWidth(0.6)}}
                                                    numberOfLines={2}
                                                    ellipsizeMode="tail">{product.name}</Text>
                                              <Text style={{
                                                  margin: 4,
                                                  alignSelf: 'center'
                                              }}>{'x' + product.quantity}</Text>
                                              <Text style={{margin: 4, alignSelf: 'center'}}>{product.total}</Text>
                                          </View>}>
                                </ListView>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }

    renderError(error) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>{error}</Text>
        </View>
    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);