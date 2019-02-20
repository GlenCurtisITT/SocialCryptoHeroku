import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';
import shortid from 'shortid'

export function addFlashMessages(message){
    return{
        type: ADD_FLASH_MESSAGE,
        message
    }
}

export function flashMessageAndDelete(dispatch, type, text){
    const id = shortid.generate();
    let message = {id: id, type: type, text: text}
    dispatch({
        type: ADD_FLASH_MESSAGE,
        message
    })
    setTimeout(() => {
        dispatch({
           type:DELETE_FLASH_MESSAGE,
           id
        })
    }, 3000)
}