import { combineReducers } from 'redux';
import recipes from './recipesReducer';
import user from './userReducer';

const rootReducer = combineReducers({ recipes, user });

export default rootReducer;
