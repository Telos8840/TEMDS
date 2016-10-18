'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import css from "./style";
import {Actions} from "react-native-router-flux";

export default class SideMenu extends Component {
    render() {
        return (
            <ScrollView>
                <View style={[css.sideMenu, this.props.menuBody]}>
                    <View style={css.profile}>
                        <Image style={css.avatar}
                               source={{uri: 'https://freeiconshop.com/files/edd/person-flat.png' }}/>
                        <Text style={[css.fullname, this.props.textColor]}>Saul Guardado</Text>
                        <Text style={[css.email, this.props.textColor]}>Los Angeles, Ca</Text>
                    </View>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.home}>
                        <Text style={[css.menuLink, this.props.textColor]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.myorders}>
                        <Text style={[css.menuLink, this.props.textColor]}>My Orders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[css.menuRow, css.menuSignOut, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.login}>
                        <Text style={[css.menuLink, css.logoutLink, this.props.textColor]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
