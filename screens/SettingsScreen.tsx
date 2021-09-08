import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { StackParamList, SelectorState } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setPageId, setToken, setDarkMode } from '../store/actions/user';
import { Switch } from 'react-native-paper';
import { colorScheme } from '../utils/colorScheme';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Settings'>;
};

export const SettingsScreen: React.FC<Props> = ({ navigation }: Props) => {
    useEffect(() => {}, []);
    const dispatch = useDispatch();
    const { token, pageId, darkMode } = useSelector(
        (state: SelectorState) => state.user
    );
    const colorPalette = colorScheme(darkMode);

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                backgroundColor: colorPalette.backgroundColor
            }}
        >
            <SettingsHeader navigation={navigation} />
            <TextInput
                style={{
                    ...styles.textInput,
                    color: colorPalette.fontColor,
                    backgroundColor: colorPalette.textInputColor
                }}
                placeholder="set your token"
                placeholderTextColor={colorPalette.placeholderColor}
                value={token}
                onChangeText={(text) => dispatch(setToken(text))}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
            />
            <TextInput
                style={{
                    ...styles.textInput,
                    color: colorPalette.fontColor,
                    backgroundColor: colorPalette.textInputColor
                }}
                placeholder="set your page id"
                placeholderTextColor={colorPalette.placeholderColor}
                value={pageId}
                onChangeText={(text) => dispatch(setPageId(text))}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
            />
            <View style={styles.darkModeContainer}>
                <Text
                    style={{
                        ...styles.darkModeLabel,
                        color: colorPalette.fontColor
                    }}
                >
                    dark mode
                </Text>
                <Switch
                    style={styles.switch}
                    value={darkMode}
                    onValueChange={() => dispatch(setDarkMode())}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textInput: {
        borderRadius: 4,
        width: 360,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 24
    },
    darkModeContainer: {
        width: 360,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24
    },
    darkModeLabel: {
        position: 'absolute',
        left: 0
    },
    switch: {
        position: 'absolute',
        right: 0
    }
});
