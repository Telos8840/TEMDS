/**
 * Created by Saul on 10/18/16.
 */

import {combineReducers} from 'redux';
import home from './HomeReducer';
import auth from './AuthReducer'

const rootReducer = combineReducers({
	home,
	auth
});

export default rootReducer;