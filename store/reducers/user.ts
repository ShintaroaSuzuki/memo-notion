import { initialState } from '../initialState';
import { UserAction, UserState } from '../../types';

export const userReducer = (
    state = initialState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_DATABASE_ID':
            return {
                ...state,
                databaseId: action.databaseId
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
