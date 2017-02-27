/**
 * Created by luanp on 12/10/2016.
 */
'use strict';
import {Dimensions} from 'react-native';

const ThemeColor1 = '#406ab3';
const ThemeColor2 = '#00aef0';
const ThemeColor3 = '#77a464';

const Constants = {
    WordPress: {
        Address: 'http://mstore.io/api',
    },
    WooCommerce: {
        url: 'http://mstore.io',
        consumerKey: 'ck_b7594bc4391db4b56c635fe6da1072a53ca4535a',
        consumerSecret: 'cs_980b9edb120e15bd2a8b668cacc734f7eca0ba40',
        wp_api: true,
        version: 'wc/v1',
        timeout: 10, //request timeout
        RootCategoryId: 0,
    },
    Auth0: {
        clientId: 'HGyi36GcDvePV4zIdwlHUACUFFEj1EQn',
        domain: 'temds.auth0.com',
    },
    Firebase: {
        apiKey: "AIzaSyAnKONYwru11yWAA8F4F023kdVCknBbliA",

        CloudMessage: {
            TOPIC: '/topics/G_NOTIFICATION',
        }
    },
    EmitCode: {
        SideMenuOpen: 'sidemenu.open',
        SideMenuClose: 'sidemenu.close',
        ProductPriceChanged: 'product.price.changed',
        SearchModalOpen: 'search.modal.open',
        SearchModalClose: 'search.modal.close',
    },
    AsyncCode: {
        Intro: 'show_intro',
    },
    Dimension: {
        ScreenWidth(percent = 1) {
            return Dimensions.get('window').width * percent;
        },
        ScreenHeight(percent = 1) {
            return Dimensions.get('window').height * percent;
        },
    },
    Image: {
        Logo: require('./images/spinner.gif'),
        SplashScreen: require('./images/splash_screen.png'),
        CategoryPlaceholder: require('./images/category_placehodler.png'),
        DefaultAvatar: require('./images/default_avatar.jpg'),
        AvatarBackground: require('./images/avatar_background.png'),
        CheckoutStep1: require('./images/line-1.png'),
        CheckoutStep2: require('./images/line-2.png'),
        CheckoutStep3: require('./images/line-3.png'),
        Stripe: require('./images/stripe.png'),
        PayPal: require('./images/PayPal.png'),
        CashOnDelivery: require('./images/cash_on_delivery.png'),
        PlaceHolder: require('./images/placeholderImage.png'),
        TEMDS: require('./images/temds_icon_no_bg.png')
    },
    Icon: { //App's icons. Checkout http://fontawesome.io/icons/ for more icons.
        Menu: 'ios-menu',
        Home: 'ios-home',
        Back: 'ios-arrow-back',
        Forward: 'ios-arrow-forward',
        Config: 'ios-settings',
        More: 'ios-more',
        SignIn: 'ios-log-in',
        SignOut: 'ios-log-out',
        ShoppingCart: 'ios-cart',
        ShoppingCartEmpty: 'ios-cart-outline',
        Sort: 'ios-funnel',
        Filter: 'ios-funnel-outline',
        ShowItem: 'ios-arrow-dropdown',
        HideItem: 'ios-arrow-dropup',
        ListMode: 'ios-list-box',
        GridMode: 'ios-grid',
        RatingFull: 'ios-star',
        RatingEmpty: 'ios-star-outline',
        Wishlist: 'ios-heart',
        WishlistEmpty: 'ios-heart-outline',
        Delete: 'ios-trash',
        AddToCart: 'ios-cart',
        MyOrder: 'ios-cube',
        News: 'ios-paper',
        Mail: 'ios-mail',
        RatioOff: 'ios-radio-button-off',
        RatioOn: 'ios-radio-button-on',
        Search: 'ios-search',
        Close: 'ios-close',
    },
    Format: {
        Currency: {
            CurrencySymbol: '$',
            IsSymbolPrefix: true, //false for suffix
            ThousandSeparator: ',',
            DecimalSeparator: "."
        },
        Date: {}
    },
    Color: {
        DirtyBackground: '#F0F0F0',

        //Toolbar
        Toolbar: 'white',
        ToolbarText: '#283747',
        ToolbarIcon: '#283747',

        ToolbarTrans: 'transparent',
        ToolbarTextTrans: 'black',
        ToolbarIconTrans: 'black',

        TopBar: 'white',
        TopBarIcon: '#283747',

        //Button
        ButtonBackground: '#00aef0',
        ButtonText: 'white',
        ButtonBorder: '#bcbebb',

        //Product tabs
        TabActive: '#00aef0',
        TabDeActive: 'white',
        TabActiveText: 'white',
        TabDeActiveText: 'black',
        BuyNowButton: '#FF9522',

        ViewBorder: '#bcbebb',

        //Spinner
        Spinner: ThemeColor1,

        //Rating
        Rating: ThemeColor2,

        //Text
        TextNormal: '#77a464',
        TextLight: 'darkgray',
        TextDark: '#000000',
        ProductPrice: ThemeColor2,

        //sidemenu
        SideMenu: '#3475C7',
        SideMenuText: 'white',
        SideMenuIcon: 'white,'
    },
    Font: {
        // ProductName: 'BodoniBold',
        // ProductName: 'SFU Bodoni',
    },
    Style: {
        widthAutoMargin(percent) {
            return {
                width: Dimensions.get('window').width * percent,
                marginLeft: Dimensions.get('window').width * (1 - percent) / 2,
                marginRight: Dimensions.get('window').width * (1 - percent) / 2,
            }
        },
    },
    Drawer: { //Drawer config
        panThreshold: 0.1, // Ratio of screen width that must be travelled to trigger a drawer open/close.
        panOpenMask: 0.04, // The area that listen to open drawer gesture
        panCloseMask: 0.4, // The area that listen to close drawer gesture
        openDrawerOffset: 0.3, // The width of scene when drawer is fully open
        side: 'left', // (left|right) which side the drawer should be on.
    },
    Rating: { // Rating config value
        Size: 20, //Default icon size
    }
}

/*  We can't reference to outer object in constructor,
 *  therefore we need to add those property after Constants was created
 */
Constants.SplashScreen = {
    Duration: 500, //Splash screen display duration (millisecond).
    Image: Constants.Image.SplashScreen
}
Constants.ProductCard = {
    ListMode: {
        container: {
            width: Constants.Dimension.ScreenWidth(0.9),
            marginLeft: Constants.Dimension.ScreenWidth(0.05),
            marginRight: Constants.Dimension.ScreenWidth(0.1 / 3),
            marginTop: Constants.Dimension.ScreenWidth(0.05),
        },
        image: {
            width: Constants.Dimension.ScreenWidth(0.9) - 2,
            height: 1.2 * Constants.Dimension.ScreenWidth(0.9),
        },
        text: {
            color: "black",
            fontSize: 16,
            marginLeft: 15,
            marginRight: 15,
        }
    },
    GridMode: {
        container: {
            width: Constants.Dimension.ScreenWidth(0.9) / 2,
            marginLeft: Constants.Dimension.ScreenWidth(0.1 / 3),
            marginRight: 0,
            marginTop: Constants.Dimension.ScreenWidth(0.1 / 3),
        },
        image: {
            width: (Constants.Dimension.ScreenWidth(0.9) / 2) - 2,
            height: 1.2 * (Constants.Dimension.ScreenWidth(0.9) / 2),
        },
        text: {
            fontSize: 14,
            marginLeft: 10,
            marginRight: 10,
        }
    }
}
Constants.Formatter = {
    currency(value) {
        const roundUp = (num, precision = 100) => (Math.ceil(num * precision) / precision);

        return (
            Constants.Format.Currency.IsSymbolPrefix ?
            Constants.Format.Currency.CurrencySymbol + roundUp(value) :
            roundUp(value) + Constants.Format.Currency.CurrencySymbol);
    }
}
Constants.Swiper = {
    swiper_dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
        marginRight: 4
    },
    swiper_active_dot: {
        backgroundColor: '#000',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
        marginRight: 4
    },
}
Constants.WooImageFetcher = (uri, containerWidth) => {
    //     Thumbnail: {width: 150, height: 150},
    //     Medium: {width: 235, height: 300},
    //     Large: {width: 803, height: 1024},

    const DPI_NUMBER = 1.5;

    const index = uri.lastIndexOf('.');
    let editedURI = uri.slice(0, index);
    let defaultType = uri.slice(index,);

    switch (true) {
        case true:
            editedURI = editedURI + '-150x150' + defaultType;
            break;
        // case containerWidth * DPI_NUMBER < 235:
        //     editedURI = editedURI + '-300x300' + defaultType;
        //     break;
        // case containerWidth * DPI_NUMBER < 803:
        //     editedURI = editedURI + '-803x1024' + defaultType;
        //     break;
        // default:
        // editedURI = editedURI + defaultType;
    }
    return editedURI;
}
export default Constants;
