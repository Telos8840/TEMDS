/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ListView
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toolbar from "./../../components/Toolbar/index";
import Button from "../../components/Button/index";
import TextInputWrapper from './Form/TextInputWrapper'

import Constants from './../../Constants';
import CountryWorker from './../../services/CountryWorker'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isLoading: true,
        }
    }

    static propTypes = {
        state: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const self = this;
        CountryWorker.getAllCountries((data) => self.setState({data: data, isLoading: false}))
    }

    render() {
        if (this.state.isLoading)return <View/>

        return (
            <View style={{flex: 1}}>
                <Toolbar title={this.props.title} back={false} cart={true}/>
                <View style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text>{JSON.stringify(this.state.data)}</Text>

                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        // todos: state.todoApp.todos,
        // todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onTodoClick: (id) => {
        //     dispatch(toggleTodo(id));
        // }
    }
}

//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Test);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

