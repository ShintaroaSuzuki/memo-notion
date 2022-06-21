import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { StackParamList, SelectorState } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setDatabaseId, setToken, setDarkMode } from '../store/actions/user';
import { Switch } from 'react-native-paper';
import { colorScheme } from '../utils/colorScheme';
import * as Linking from 'expo-linking';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Settings'>;
};

export const SettingsScreen: React.FC<Props> = ({ navigation }: Props) => {
    useEffect(() => {}, []);
    const dispatch = useDispatch();
    const { token, databaseId, darkMode } = useSelector(
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
                placeholder="set your integration token"
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
                placeholder="set your database id"
                placeholderTextColor={colorPalette.placeholderColor}
                value={databaseId}
                onChangeText={(text) => dispatch(setDatabaseId(text))}
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
            <View style={styles.HowToTextContainer}>
                <Text
                    style={{
                        ...styles.HowToText,
                        color: colorPalette.urlColor
                    }}
                    onPress={() =>
                        Linking.openURL(
                            'https://www.notion.so/shintaroa/How-To-Get-Your-Integration-Token-00a544786ea844a9b6b1a2a38d4a4e0e'
                        )
                    }
                >
                    how to get your integration token
                </Text>
            </View>
            <View style={styles.HowToTextContainer}>
                <Text
                    style={{
                        ...styles.HowToText,
                        color: colorPalette.urlColor
                    }}
                    onPress={() =>
                        Linking.openURL(
                            'https://www.notion.so/shintaroa/How-To-Get-Your-Page-ID-ad0199d28d004b8e9b6e41eda2b1166f'
                        )
                    }
                >
                    how to get your database id
                </Text>
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
        marginTop: 24,
        marginBottom: 96
    },
    darkModeLabel: {
        position: 'absolute',
        left: 0,
        fontSize: 16
    },
    HowToTextContainer: {
        width: 360,
        height: 48
    },
    HowToText: {
        fontSize: 16,
        textDecorationLine: 'underline',
        alignSelf: 'flex-start'
    },
    switch: {
        position: 'absolute',
        right: 0
    }
});
