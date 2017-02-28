/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";

import Constants from './../../Constants';
import Languages from './../../Languages';
import Toolbar from "./../../components/Toolbar";
import LogoSpinner from "./../../components/LogoSpinner";
import {selectCategory} from '../../reducers/Category/actions';
import {toggleProductViewMode, fetchProductsByCategoryId} from '../../reducers/Product/actions';
import {clearProducts} from '../../reducers/Product/actions';

import TopBar from "./TopBar";
import ProductCard from "./ProductCard";

class Category extends Component {
    constructor(props) {
        super(props);
        this.styles = {container: {flex: 1}};
        this.currentCategoryId = this.props.initCategoryId;
        this.currentViewMode = this.props.Product.viewMode;
        this.pageNumber = 1;
        this.limitPerPage = 8;
    }

    static propTypes = {
        toggleProductViewMode: PropTypes.func.isRequired,
        selectCategory: PropTypes.func.isRequired,
        fetchProductsByCategoryId: PropTypes.func.isRequired,
        clearProducts: PropTypes.func.isRequired,

        Category: PropTypes.object.isRequired,
        Product: PropTypes.object.isRequired,

        initCategoryId: PropTypes.number.isRequired, //categoryId
        title: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.fetchProductsByCategoryId(this.props.Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
    }

    componentWillReceiveProps(nextProps) {
        const {Category, Product} = nextProps;
        if (this.currentCategoryId !== Category.selectedCategoryId) {
            this.currentCategoryId = Category.selectedCategoryId;
            this.pageNumber = 1;
            this.props.fetchProductsByCategoryId(Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
        }

        if (this.currentViewMode !== Product.viewMode) {
            this.currentViewMode = Product.viewMode;
            if (this.refs._listView !== undefined)
                this.refs._listView.scrollTo({x: 5, y: 5, animated: true}) //Scroll to top when view mode change
        }
    }

    render() {
        const title = this.props.title + (this.props.Category.selectedCategoryId === this.props.initCategoryId
                ? '' : ' - ' + this.props.Category.selectedCategoryName);

        return (
            <View style={this.styles.container}>
                <Toolbar {...this.props}/>
                <TopBar toggleProductViewMode={this.props.toggleProductViewMode}
                        selectCategory={this.props.selectCategory}
                        viewMode={this.props.Product.viewMode}
                        categories={this.props.Category.categories}
                        initCategoryId={this.props.initCategoryId}
                        initCategoryName={this.props.title}
                        clearProducts={this.props.clearProducts}
                />
                {this.props.Product.products.length > 0 ?
                    this.renderProducts(this.props.Product.products) : <LogoSpinner fullStretch/>
                }
            </View>
        );
    }

    renderProducts(data) {
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
        const goToProduct = (productId) => Actions.product({productId: productId})


        const renderRow = (product) => (
            <ProductCard
                onPress={goToProduct}
                viewMode={this.props.Product.viewMode}
                product={product}
            />
        );

        const onEndReached = () => {
            if (!this.props.Product.isFetching && this.props.Product.stillFetch)
                this.props.fetchProductsByCategoryId(this.props.Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
        }
        const renderFooter = () => {
            return (this.props.Product.stillFetch ? <View style={{height: 30}}/> :
                <View style={{
                    height: 60,
                    width: Constants.Dimension.ScreenWidth(),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{color: Constants.Color.TextDark, fontSize: 16}}>{Languages.ThereIsNoMore}</Text>
                </View>);
        }
        const onRefresh = () => {
            this.props.clearProducts();
            this.pageNumber = 1;
            this.props.fetchProductsByCategoryId(this.props.Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
        }

        return <ListView
            ref="_listView"
            contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: "flex-start"
            }}
            dataSource={dataSource.cloneWithRows(data)}
            renderRow={renderRow}
            onEndReached={onEndReached}
            renderFooter={renderFooter}
            enableEmptySections={true}
            refreshControl={ <RefreshControl refreshing={this.props.Product.isFetching}
                                             onRefresh={onRefresh}/> }
        />
    }
}

const mapStateToProps = (state) => {
    return {
        Category: state.Category,
        Product: state.Product,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProductViewMode: () => {
            dispatch(toggleProductViewMode());
        },
        selectCategory: (selectedCategoryId, selectedCategoryName) => {
            dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
        },
        fetchProductsByCategoryId: (categoryId, per_page, page) => {
            dispatch(fetchProductsByCategoryId(categoryId, per_page, page));
        },
        clearProducts: () => dispatch(clearProducts()),
    }
}

//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Category);
