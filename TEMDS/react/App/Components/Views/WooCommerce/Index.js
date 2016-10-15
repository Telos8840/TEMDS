'use strict';

import React, {Component} from "react";
import {
    TextInput,
    Text,
    View,
    Image,
    StatusBarIOS,
    ListView,
    Animated,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    NetInfo,
    DeviceEventEmitter
} from "react-native";
import {Actions} from "react-native-router-flux";
import Toolbar from "./../../Controls/Toolbar";
import ProductItem from "./ProductItem";
import Api from "./../../../Services/Api";
import css from "./../../Styles/style";
import product from "./../../Styles/product";
import Spinner from "react-native-spinkit";

var offset = 0;
var offsetHeader = 100;
var beta = 50;

export default class WooProduct extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            page: 1,
            limit: 2,
            isOnline: true,
            isLoading: false,
            finish: false,
            _animatedMenu: new Animated.Value(0),
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        }
    }

    hideMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: -120
        }).start();
    }

    showMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: 0
        }).start();
    }

    onScroll(event) {
        var currentOffset = event.nativeEvent.contentOffset.y;

        if (currentOffset < offsetHeader) {
            return;
        }

        if (Math.abs(offset - currentOffset) <= beta)
            return;


        if (currentOffset > offset) {
            this.hideMenu();
        } else if (currentOffset < offset) {
            this.showMenu()
        }
        offset = currentOffset;
    }

    componentDidMount() {
        // check internet connecting
        // NetInfo.isConnected.fetch().done(isConnected => {
        //     this.setState({isOnline: isConnected});
        // });
        this.fetchData();
    }

    fetchData() {
        var self = this;
        if (this.state.finish || !this.state.isOnline) {
            return;
        }
        self.setState({isLoading: true});

        Api.get('products', {
          per_page: this.state.limit,
          page: this.state.page})
            .then(function (data) {
                console.log(data);

                self.data = self.data.concat(data);
                self.setState({
                    page: self.state.page + 1,
                    finish: data.length < self.state.limit,
                    isLoading: false,
                    dataSource: self.getDataSource(self.data)
                });
            });
    }


    getDataSource(products) {
        return this.state.dataSource.cloneWithRows(products);
    }

    onEndReached() {
        this.fetchData();
    }

    renderRow(product) {
        return (
            <ProductItem product={product}></ProductItem>
        );
    }

    render() {
        return (
            <View style={product.color}>
                <Animated.View style={[css.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
                    <Toolbar name="Product" heartButton={true} />
                    <TextInput style={css.inputSearch} underlineColorAndroid='rgba(0,0,0,0)' placeholder={'Search'}/>
                </Animated.View>

                <ScrollView
                    style={{paddingTop: 106}}
                    onScroll={this.onScroll.bind(this)} scrollEventThrottle={30}
                >
                    <ListView
                        onEndReached={this.onEndReached.bind(this)}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}>
                    </ListView>

                    <View style={css.spinner}>
                        <Spinner isVisible={this.state.isLoading}
                                 size={40}
                                 type="Circle"
                                 color="#1CAADE"/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
