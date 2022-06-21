import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { postToNotion } from '../utils/postToNotion';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { colorScheme } from '../utils/colorScheme';
import { StackParamList, SelectorState } from '../types';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
    title: string;
    body: string;
    _onPress: () => void;
};

export const MainHeader: React.FC<Props> = ({
    navigation,
    title,
    body,
    _onPress
}: Props) => {
    const { token, databaseId, darkMode } = useSelector(
        (state: SelectorState) => state.user
    );
    const colorPalette = colorScheme(darkMode);
    const post = async () => {
        setPressed(true);
        const response = await postToNotion({
            token,
            databaseId,
            title,
            body
        });
        if (response == 'APIResponseError') {
            Alert.alert(
                'Either one or both of your token and page id is invalid'
            );
        } else {
            _onPress();
            setDisplaySuccess(true);
            setTimeout(() => setDisplaySuccess(false), 1500);
        }
        setPressed(false);
    };

    const [pressed, setPressed] = useState<boolean>(false);
    const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

    return (
        <View
            style={{
                ...styles.container,
                borderColor: colorPalette.borderColor
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Settings');
                }}
                style={[styles.headerContent, styles.settingsButtonContainer]}
            >
                <Icon
                    name="settings"
                    size={20}
                    style={[styles.settingsButton]}
                />
            </TouchableOpacity>
            <Text
                style={[
                    styles.headerContent,
                    styles.headerTitle,
                    { color: colorPalette.fontColor }
                ]}
            >
                new memo
            </Text>
            <Text
                style={[
                    styles.headerContent,
                    styles.postButton,
                    {
                        color: displaySuccess
                            ? colorPalette.activeColor
                            : title && !pressed
                            ? colorPalette.activeColor
                            : colorPalette.deactiveColor
                    }
                ]}
                onPress={() => title && !pressed && !displaySuccess && post()}
            >
                {displaySuccess ? 'success!' : pressed ? 'posting...' : 'post'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginBottom: 32
    },
    headerContent: {
        alignSelf: 'flex-end',
        height: 36,
        position: 'absolute'
    },
    settingsButtonContainer: {
        left: 8
    },
    settingsButton: {
        color: '#aaa',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 8
    },
    postButton: {
        right: 8,
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 8
    }
});
