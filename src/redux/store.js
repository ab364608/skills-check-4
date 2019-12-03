import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise-middleware';
import authReducer from './AuthReducer/AuthReducer';

const root = combineReducers({
    authReducer
});

export default createStore(root, applyMiddleware(promise));