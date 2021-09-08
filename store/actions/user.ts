import { UserAction } from '../../types';

export const setToken = (token: string): UserAction => {
    return {
        type: 'SET_TOKEN',
        token
    };
};

export const setPageId = (pageId: string): UserAction => {
    return {
        type: 'SET_PAGE_ID',
        pageId
    };
};

export const setDarkMode = (): any => {
    return {
        type: 'SET_DARK_MODE'
    };
};
