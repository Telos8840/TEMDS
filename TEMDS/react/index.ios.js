/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, { Component } from 'react';
import { AppRegistry,  StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './App/Components/store';
import RootRouter from './App/Components/RootRouter';
import {loadRestaurants} from './App/actions/HomeAction';

StatusBar.setBarStyle('light-content');
const store = configureStore();
store.dispatch(loadRestaurants());

class eCommerce extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootRouter />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('eCommerce', () => eCommerce);
