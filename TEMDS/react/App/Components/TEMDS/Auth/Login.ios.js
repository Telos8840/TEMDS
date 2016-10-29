'use strict';

import React, {Component} from "react";
import {
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    DeviceEventEmitter
} from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../../actions/AuthAction';
import {API_ROOT} from '../../../middleware/api';

import {Actions} from "react-native-router-flux";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import css from "../../Styles/style";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            visibleHeight: Dimensions.get('window').height,
            scroll: false
        };

        this.login = this.login.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }

    checkAuth(nextProps) {
        if (!nextProps.user.token) {
            console.log('not logged in');
        } else {
            Actions.home();
        }
    }

    login(user) {
        this.props.actions.login();
        /*return fetch(API_ROOT + 'api/auth/signIn', {
            method: 'POST',
            body: JSON.stringify({
                email: 'seguardado88@gmail.com',
                rawPass: 'password'
            })
        }).then((res)=> {
            return res.json()
        }).then((json)=> {
            console.log('return json', json);
            this.setState({auth: json});
            console.log('state', this.state);
        }).catch((error) => {
            console.warn(error)
        }).done()*/
    }

    render() {
        const toolbar = (
            <View style={[css.toolbarMenu]}>
                {/*<View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={Actions.product}>
                        <Image source={require('../../images/icon-back.png')}
                               style={[css.imageIconLarge, {marginLeft: 8, width: 14}]}></Image>
                    </TouchableOpacity>
                </View>*/}

                <View style={css.mainLogoContainer}>
                    <Image style={css.logo} source={require('../../../images/temds-words.png')} />
                </View>

                {/*<View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={Actions.cart}>
                        <Image source={require('../../images/icon-bag.png')}
                               style={[css.imageIconLarge, {marginRight: 8}]}></Image>
                    </TouchableOpacity>
                </View>*/}
            </View>
        )
        return (
            <View style={css.layout}>
                {toolbar}
                <ScrollableTabView
                    initialPage={0}
                    locked={false}
                    tabBarUnderlineStyle={ {height: 2, backgroundColor: "#1CAADE"}  }

                    tabBarActiveTextColor={"#393838"}
                    tabBarInactiveTextColor={"#B8B8B8"}
                    tabBarTextStyle={{ fontWeight: 'normal', fontSize: 14}}
                    style={{paddingTop: 30, backgroundColor: '#ffff'}}
                    contentProps={{backgroundColor: '#ffff', marginTop: 0}}
                    renderTabBar={() => <ScrollableTabBar
                          underlineHeight={3}
                          style={{borderBottomColor: '#eee'}}
                          tabsContainerStyle={{paddingLeft: 30, paddingRight: 30}}
                          tabStyle={{paddingBottom: 0, borderBottomWidth: 0, paddingTop: 0, paddingLeft: 50, paddingRight: 50}}
                         />}
                    >
                    <SignIn tabLabel="Login" login={this.login}/>
                    <SignUp tabLabel="Sign Up"/>
                </ScrollableTabView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    console.log('login state', state.auth);
    return {
        user: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);