/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { AppRegistry,  StatusBar} from 'react-native';

StatusBar.setBarStyle('light-content');
import RootRouter from './App/Components/RootRouter';

class eCommerce extends Component {
    render() {
        return (
            <RootRouter />
        );
    }
}

AppRegistry.registerComponent('eCommerce', () => eCommerce);
