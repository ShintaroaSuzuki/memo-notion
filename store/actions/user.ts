import { UserAction } from '../../types';

export const setToken = (token: string): UserAction => {
    return {
        type: 'SET_TOKEN',
        token
    };
};

export const setDatabaseId = (databaseId: string): UserAction => {
    return {
        type: 'SET_DATABASE_ID',
        databaseId
    };
};

export const setDarkMode = (): any => {
    return {
        type: 'SET_DARK_MODE'
    };
};
