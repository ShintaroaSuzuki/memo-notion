export type PostArgument = {
    pageId: string;
    token: string;
    title: string;
    body: string;
};

export type StackParamList = {
    Main: undefined;
    Settings: undefined;
};

export type UserState = {
    token: string | undefined;
    pageId: string | undefined;
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
