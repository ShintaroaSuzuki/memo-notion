import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput } from 'react-native';
import { MainHeader } from '../components/MainHeader';
import { StackParamList, SelectorState } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { colorScheme } from '../utils/colorScheme';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
};

export const MainScreen: React.FC<Props> = ({ navigation }: Props) => {
    const { darkMode } = useSelector((state: SelectorState) => state.user);
    const colorPalette = colorScheme(darkMode);

    const titleFocus = () => {
        titleRef.current?.focus();
    };

    const bodyFocus = () => {
        bodyRef.current?.focus();
    };

    useEffect(() => {
        titleFocus();
    }, []);

    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');

    const titleRef = useRef<TextInput>(null);
    const bodyRef = useRef<TextInput>(null);

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                backgroundColor: colorPalette.backgroundColor
            }}
        >
            <MainHeader
                navigation={navigation}
                title={title}
                body={body}
                onChangeTitle={onChangeTitle}
                onChangeBody={onChangeBody}
            />
            <View style={styles.inputArea}>
                <TextInput
                    ref={titleRef}
                    style={[
                        styles.textInput,
                        styles.titleInput,
                        {
                            color: colorPalette.fontColor,
                            backgroundColor: colorPalette.textInputColor
                        }
                    ]}
                    placeholder="title"
                    placeholderTextColor={colorPalette.placeholderColor}
                    value={title}
                    onChangeText={onChangeTitle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="done"
                    onEndEditing={() => bodyFocus()}
                />
                <TextInput
                    ref={bodyRef}
                    style={[
                        styles.textInput,
                        styles.bodyInput,
                        {
                            color: colorPalette.fontColor,
                            backgroundColor: colorPalette.textInputColor
                        }
                    ]}
                    placeholder="body"
                    placeholderTextColor={colorPalette.placeholderColor}
                    value={body}
                    onChangeText={onChangeBody}
                    multiline={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    inputArea: {
        width: 360
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    textInput: {
        borderRadius: 4,
        width: 360,
        padding: 8
    },
    titleInput: {
        height: 32,
        marginBottom: 20
    },
    bodyInput: {
        height: 240
    }
});
