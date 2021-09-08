import { initialState } from '../initialState';
import { UserAction } from '../../types';

export const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PAGE_ID':
            return {
                ...state,
                pageId: action.pageId
            };
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode: !state.darkMode
            };
        default:
            return state;
    }
};
