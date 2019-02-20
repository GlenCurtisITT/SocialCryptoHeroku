import { GET_TOPCRYPTOS_FETCHING, GET_TOPCRYPTOS_SUCCESS } from '../actions/types';

const initialState = {
    fetching: true,
    topCryptos: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TOPCRYPTOS_FETCHING:
            return {
                ...state
            }
        case GET_TOPCRYPTOS_SUCCESS:
            return {
                ...state,
                fetching: false,
                topCryptos: action.topCryptos
            }
        default:
            return state;
    }
}