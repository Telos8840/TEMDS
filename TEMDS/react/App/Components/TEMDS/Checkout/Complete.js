'use strict';

import React, {Component} from "react";
import {ListView, Platform, Text, View, Image, TouchableOpacity, ScrollView, TextInput} from "react-native";
import shipping from "./shipping-style";
import {Actions} from "react-native-router-flux";
import Toolbar from "../../Controls/Toolbar";
import ButtonRound from "../../Controls/ButtonRound";
import * as Animatable from "react-native-animatable";

export default class Confirm extends Component {
    render() {
        const getStatus = () => {
            if (Platform.OS === 'ios') {
                return <View style={shipping.statusContainer}>
                    <View style={shipping.status}>
                        <TouchableOpacity onpress={Actions.checkout}>
                            <View style={[shipping.statusIcon, shipping.statusFinish]}/>
                            <Text style={[shipping.tabName, shipping.tabNameActive]}>Shipping</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={[shipping.statusIcon, shipping.statusFinish]}/>
                            <Text style={[shipping.tabName, shipping.tabNameActive]}>Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={[shipping.statusIcon, shipping.statusFinish]}/>
                            <Text style={[shipping.tabName, shipping.tabNameActive]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[shipping.status, shipping.statusFull, shipping.statusComplete]}/>
                </View>
            }
        };

        return (
            <View style={shipping.layout}>
                <Toolbar name="Order Complete" noIcon={true}/>

                {getStatus()}

                <View style={shipping.successView}>
                    <Animatable.View animation="lightSpeedIn" easing="ease-out" style={{justifyContent: 'center',  alignItems: 'center'}}>
                        <Image source={require('../../../images/temds_icon_no_bg.png')} style={{width: 200, height: 200}}/>
                    </Animatable.View>

                    <Text style={shipping.h1}>Congratulations. Your order is accepted.</Text>

                    <Text style={shipping.body}>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </View>

                <TouchableOpacity style={{marginBottom: 16}}>
                    <ButtonRound text="Track order" onPress={Actions.trackorder}/>
                </TouchableOpacity>
            </View>
        )
    }
};
