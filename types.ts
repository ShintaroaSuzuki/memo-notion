export type PostArgument = {
    token: string;
    pageId: string;
    title: string;
    body: string;
};

export type StackParamList = {
    Main: undefined;
    Settings: undefined;
};

export type UserState = {
    token: string;
    pageId: string;
    darkMode: boolean;
};

export type UserAction = {
    type: string;
    token?: string;
    pageId?: string;
};

export type SelectorState = {
    user: UserState;
};
