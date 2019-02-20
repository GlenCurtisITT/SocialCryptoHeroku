import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from "../actions/types";

export default (state = [], action = {}) => {
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: action.message.id,
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const newState = Object.assign([], state);
            const indexOfMessageToDelete = state.findIndex(flashMessages => {
                return flashMessages.id === action.id
            });
            newState.splice(indexOfMessageToDelete, 1);
            return newState;
        default: return state;
    }
}