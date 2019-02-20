import axios from 'axios';
import { GET_TOPCRYPTOS_FETCHING, GET_TOPCRYPTOS_SUCCESS } from './types';

export const fetchTopCryptos = () => async dispatch => {
    dispatch({type: GET_TOPCRYPTOS_FETCHING})
    let res = await axios.get(`http://localhost:3001/toptencryptos`);
    dispatch({type: GET_TOPCRYPTOS_SUCCESS, topCryptos: res.data})
}