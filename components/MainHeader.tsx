import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { postToNotion } from '../utils/postToNotion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { colorScheme } from '../utils/colorScheme';
import { StackParamList, SelectorState } from '../types';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
    title: string;
    body: string;
    onChangeTitle: Dispatch<SetStateAction<string>>;
    onChangeBody: Dispatch<SetStateAction<string>>;
};

export const MainHeader: React.FC<Props> = ({
    navigation,
    title,
    body,
    onChangeTitle,
    onChangeBody
}: Props) => {
    const { token, pageId, darkMode } = useSelector(
        (state: SelectorState) => state.user
    );
    const colorPalette = colorScheme(darkMode);
    const post = () => {
        postToNotion({
            token,
            pageId,
            title,
            body
        });
        onChangeTitle('');
        onChangeBody('');
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
        left: 24
    },
    settingsButton: {
        color: '#aaa'
    },
    headerTitle: {
        fontWeight: 'bold'
    },
    postButton: {
        right: 24
    }
});
