// /**
//  * Created by luanp on 22/09/2016.
//  */
// 'use strict';
//
// import React, {Component, PropTypes} from 'react';
// import {Text, View, ListView} from 'react-native';
// import {connect} from 'react-redux';
// import {Actions} from "react-native-router-flux";
//
// import Constants from './../../Constants';
// import Languages from './../../Languages';
// import Toolbar from "./../../components/Toolbar";
// import ImageCard from "./../../components/ImageCard";
// import LogoSpinner from "./../../components/LogoSpinner";
// import {fetchAllCategories, selectCategory} from '../../reducers/Category/actions'
// import {clearProducts} from '../../reducers/Product/actions'
//
// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.styles = {
//             container: {flex: 1},
//             imageCard: {
//                 width: Constants.Dimension.ScreenWidth(1),
//                 height: 200,
//             },
//             mainCategoryText: {
//                 color: 'white',
//                 fontSize: 30
//             },
//             numberOfProductsText: {
//                 color: 'white',
//                 fontSize: 15
//             }
//         };
//     }
//
//     static propTypes = {
//         Category: PropTypes.object.isRequired,
//         clearProducts: PropTypes.func.isRequired,
//     };
//
//     componentDidMount() {
//         if (this.props.Category.categories.length == 0)
//             this.props.fetchAllCategories();
//     }
//
//     render() {
//         const subCategories = this.props.Category.categories.filter(category => category.parent === Constants.WooCommerce.RootCategoryId);
//
//         return (
//             <View style={this.styles.container}>
//                 <Toolbar {...this.props}/>
//                 {this.props.Category.isFetching ?
//                     <LogoSpinner fullStretch/> :
//                     this.props.Category.error ?
//                         this.renderError(this.props.Category.error) :
//                         this.renderCategories(subCategories)
//                 }
//             </View>
//         );
//     }
//
//     renderError(error) {
//         return <View style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//             <Text>{error}</Text>
//         </View>
//     }
//
//     renderCategories(data) {
//         const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
//         const goToCategory = (category) => {
//             this.props.clearProducts();
//             this.props.selectCategory(category.id, undefined);
//             Actions.category({initCategoryId: category.id, title: category.name});
//         }
//
//         const renderRow = (category) => (
//             <ImageCard
//                 onPress={() => goToCategory(category) }
//                 style={this.styles.imageCard}
//                 source={ category.image.src ? {uri: category.image.src} : undefined }
//             >
//                 <Text style={this.styles.mainCategoryText}>{category.name}</Text>
//                 <Text style={this.styles.numberOfProductsText}>{category.count} {Languages.products}</Text>
//             </ImageCard>
//         );
//
//         return <ListView
//             dataSource={dataSource.cloneWithRows(data)}
//             renderRow={renderRow}
//             enableEmptySections={true}
//         />
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         Category: state.Category,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchAllCategories: () => {
//             dispatch(fetchAllCategories());
//         },
//         selectCategory: (selectedCategoryId, selectedCategoryName) => {
//             dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
//         },
//         clearProducts: () => dispatch(clearProducts()),
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, Platform} from 'react-native';
import {connect} from 'react-redux';

import Constants from './../../Constants';
import Languages from './../../Languages';
import Toolbar from "./../../components/Toolbar";
import ImageCard from "./../../components/ImageCard";
import Spinner from "./../../components/Spinner";
import {fetchAllCategories, selectCategory} from '../../reducers/Category/actions'
import {clearProducts} from '../../reducers/Product/actions'


import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import ProductList from "./ProductList";
import SpecialRequests from "./SpecialRequests";


class Home extends Component {
	constructor(props) {
		super(props);
		this.styles = {
			container: {flex: 1},
			imageCard: {
				width: Constants.Dimension.ScreenWidth(1),
				height: 200,
			},
			mainCategoryText: {
				color: 'white',
				fontSize: 25
			},
			numberOfProductsText: {
				color: 'white',
				fontSize: 25
			}
		};
	}

	static propTypes = {
		Category: PropTypes.object.isRequired,
		clearProducts: PropTypes.func.isRequired,
	};

	componentDidMount() {
		if (this.props.Category.categories.length == 0)
			this.props.fetchAllCategories();
	}

	renderCategories(categories) {
		return (
            <View style={this.styles.container}>
                <ScrollableTabView
                    initialPage={0}
                    locked={true}
                    tabBarUnderlineStyle={ {height: 2, backgroundColor: "#393800"}  }
                    tabBarActiveTextColor={"#393838"}
                    tabBarInactiveTextColor={"#B8B8B8"}
                    tabBarTextStyle={{height: 20, fontWeight: 'normal', fontSize: 13}}

                    renderTabBar={() => <ScrollableTabBar
                        underlineHeight={2}
                        tabsContainerStyle={{height: (Platform.OS === 'ios' ? 38 : 49)}}
                        tabStyle={{paddingBottom: 0, borderBottomWidth: 0, paddingTop: 0, paddingLeft: 10, paddingRight: 10}}
                    />}>

                    <ProductList tabLabel="Restaurants" restaurants={categories} selectCategory={this.props.selectCategory}/>
                    <SpecialRequests tabLabel="Special Requests"/>
                </ScrollableTabView>
            </View>
		);
	}

	renderError(error) {
		return <View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}}>
            <Text>{error}</Text>
        </View>
	}

	render() {
		return (
            <View style={this.styles.container}>
                <Toolbar title={this.props.title} back={this.props.back} cart={this.props.cart} />

				{ this.props.Category.isFetching ?
                    <Spinner fullStretch/> :
					this.props.Category.error ?
						this.renderError(this.props.Category.error) :
						this.renderCategories(this.props.Category.categories)
				}
            </View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		Category: state.Category,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllCategories: () => {
			dispatch(fetchAllCategories());
		},
		selectCategory: (selectedCategoryId, selectedCategoryName) => {
			dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
		},
		clearProducts: () => dispatch(clearProducts()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

