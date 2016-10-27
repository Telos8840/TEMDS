/**
 * Created by Saul on 10/18/16.
 */

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

function configureStore(initialState) {
	if (__DEV__) {
		console.log('STARTING DEV');
		return createStore(rootReducer, initialState, applyMiddleware(thunk, reduxImmutableStateInvariant()))
	} else {
		console.log('STARTING PROD');
		return createStore(rootReducer, initialState);
	}
}

export default configureStore;