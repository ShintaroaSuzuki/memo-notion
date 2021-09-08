import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, SettingsScreen } from '../screens';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
