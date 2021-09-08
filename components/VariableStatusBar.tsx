import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { SelectorState } from '../types';

export const VariableStatusBar = () => {
    const { darkMode } = useSelector((state: SelectorState) => state.user);
    return <StatusBar style={darkMode ? 'light' : 'dark'} />;
};
