export type PostArgument = {
    token?: string;
    databaseId?: string;
    title: string;
    body: string;
};

export type StackParamList = {
    Main: undefined;
    Settings: undefined;
};

export type UserState = {
    token?: string;
    databaseId?: string;
    darkMode: boolean;
};

export type UserAction = {
    type: string;
    token?: string;
    databaseId?: string;
};

export type SelectorState = {
    user: UserState;
};
