import { combineReducers } from 'redux'
import errorReducer from './errorReducer';
import authReducer from "./authReducer";
import flashMessages from './flashReducer'
import homeReducer from './homeReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    home: homeReducer,
    flashMessages
})