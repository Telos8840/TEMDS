'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/EvilIcons";
import css from "./../Styles/style";
import AppEventEmitter from "../../Services/AppEventEmitter";
import IconImage from "./IconImage";

let style = null;

export default class Toolbar extends Component {
    open() {
        AppEventEmitter.emit('hamburger.click');
    }

    changeLayout() {
        AppEventEmitter.emit('news.changeLayout');
    }

    changeStyle() {
        style = css.toolbarTitleView;

        if (this.props.noIcon != null) {
            style = css.toolbarTitleViewNoIcon;
        }

        if (this.props.checkout != null) {
            style = css.toolbarTitleViewCheckout;
        }

        return style;
    }

    render() {
        const self = this;

        const homeButton = function () {
            if (typeof self.props.isChild != 'undefined') {
                return (
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={self.props.action ? self.props.action : Actions.home}>
                            <Icon name={'chevron-left'} style={[css.icon, css.iconBack]}/><Text
                            style={{marginLeft: 20}}>back</Text>
                        </TouchableOpacity>
                    </View>

                );
            }
            return (
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={self.open} style={css.iconPadding}>
                        <Image source={require('../../images/icon-nav.png')}
                               style={[css.imageIcon, css.iconHome]} />
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <View style={css.toolbarMenu}>
                {homeButton()}

                <View style={this.changeStyle()}>
                    <Text style={css.toolbarTitle}>{this.props.name}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {self.props.layoutButton ? <IconImage action={Actions.productgrid}
                                                          image={require('../../images/icon-window.png')}/> : null }

                    {self.props.newsLayoutButton ? <IconImage action={this.changeLayout.bind(this)}
                                                          image={require('../../images/icon-window.png')}/> : null }

                    {self.props.gridButton ?
                        <IconImage action={Actions.product} image={require('../../images/icon-list.png')}/> : null }
                    
                    {self.props.heartButton ?
                        <IconImage action={Actions.wishlist} image={require('../../images/icon-heart.png')}/> : null }

                    {self.props.cartButton ? <IconImage action={Actions.cart} image={require('../../images/cart-moving.png')}/> : null }

                    {self.props.searchButton ? <IconImage image={require('../../images/icon-search.png')}/> : null }
                </View>
            </View>
        );
    }
}
