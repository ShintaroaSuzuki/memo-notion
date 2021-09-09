import React, { Dispatch, SetStateAction } from 'react';
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
    const { token, pageId, darkMode } = useSelector(
        (state: SelectorState) => state.user
    );
    const colorPalette = colorScheme(darkMode);
    const post = async () => {
        const response = await postToNotion({
            token,
            pageId,
            title,
            body
        });
        if (response == 'APIResponseError') {
            Alert.alert(
                'Either one or both of your token and page id is invalid'
            );
        }
        _onPress();
    };

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
                        color:
                            title && body
                                ? colorPalette.activeColor
                                : colorPalette.deactiveColor
                    }
                ]}
                onPress={() => title && body && post()}
            >
                post
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
        bottom: 8,
        height: 20,
        position: 'absolute'
    },
    settingsButtonContainer: {
        left: 24,
        marginBottom: 0
    },
    settingsButton: {
        color: '#aaa'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    postButton: {
        right: 24,
        fontSize: 16
    }
});
