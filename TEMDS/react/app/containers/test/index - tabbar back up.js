/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";

import Constants from '../../Constants';
import Languages from '../../Languages';
import Toolbar from "./../../components/Toolbar";
import Button from "./../../components/Button";
import Spinner from "./../../components/Spinner";
import WooWorker from '../../services/WooWorker';
import {setProductViewMode, ProductViewMode} from '../../reducers/Category/actions'

import ProductTab from "../category/ProductTab";

let styles = {};

class Category extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        category: PropTypes.object.isRequired,
        categoryId: PropTypes.number.isRequired, //categoryId
        title: PropTypes.string.isRequired,
    };

    componentDidMount() {
    }

    render() {
        styles = {
            container: {flex: 1},
            imageCard: {
                width: Constants.Dimension.ScreenWidth(1),
                height: 200,
            },
            mainCategoryText: {color: 'white', fontSize: 25},
            numberOfProductsText: {color: 'white', fontSize: 25}
        }

        // console.log(this.props.category);

        const subCategories = this.props.category.categories.filter(category =>
            category.parent === this.props.categoryId || category.id == this.props.categoryId
        );

        // {/*<Product key={i} categoryId={ category.id} tabLabel={ category.name} viewMode={currentMode}/>*/}
        return (
            <View style={styles.container}>
                <Toolbar title={this.props.title} back={this.props.back} cart={this.props.cart}/>
                <Button onPress={() => this.props.setViewMode(ProductViewMode.LIST_VIEW)}>LIST</Button>
                <Button onPress={() => this.props.setViewMode(ProductViewMode.GRID_VIEW)}>GRID</Button>
                {subCategories.length == 0 ?
                    <Text>0</Text> :
                    <ScrollableTabView
                        tabBarBackgroundColor={Constants.TabBar.tabBarBackgroundColor}
                        tabBarActiveTextColor={Constants.TabBar.tabBarActiveTextColor}
                        tabBarInactiveTextColor={Constants.TabBar.tabBarInactiveTextColor}
                        tabBarUnderlineStyle={Constants.TabBar.tabBarUnderlineStyle}
                        tabBarTextStyle={Constants.TabBar.tabBarTextStyle}
                        style={Constants.TabBar.style}
                        renderTabBar={() => <ScrollableTabBar
                            tabsContainerStyle={Constants.TabBar.tabsContainerStyle}
                            tabStyle={Constants.TabBar.tabStyle}
                        />}
                    >
                        {subCategories.map((category, i) => (
                            <ProductTab key={i} categoryId={category.id} tabLabel={category.name}/>
                        )) }
                    </ScrollableTabView>
                }
            </View>
        );
    }

    opGoToSubCategory(category) {
        // Actions.subcategories({categoryId: category.id, title: category.name});
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        category: state.category,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setViewMode: (VIEW_MODE) => {
            dispatch(setProductViewMode(VIEW_MODE));
        }
    }
}

//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Category);
