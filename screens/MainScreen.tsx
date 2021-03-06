import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    LogBox,
    Animated
} from 'react-native';
import { MainHeader } from '../components/MainHeader';
import { StackParamList, SelectorState } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { colorScheme } from '../utils/colorScheme';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
};

export const MainScreen: React.FC<Props> = ({ navigation }: Props) => {
    const { token, databaseId, darkMode } = useSelector(
        (state: SelectorState) => state.user
    );
    const colorPalette = colorScheme(darkMode);

    const vibrationAnim = useRef(new Animated.Value(0)).current;

    const titleFocus = () => {
        titleRef.current?.focus();
    };

    const _onPress = () => {
        vibrationAnim.setValue(0);
        Animated.timing(vibrationAnim, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false
        }).start();
        onChangeTitle('');
        onChangeBody('');
    };

    const interpolatedValue = vibrationAnim.interpolate({
        inputRange: [0, 40, 80, 90, 100],
        outputRange: [0, -8, 0, 4, 0]
    });

    const bodyFocus = () => {
        bodyRef.current?.focus();
    };

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => titleFocus();
            return () => unsubscribe();
        }, [])
    );

    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');

    const titleRef = useRef<TextInput>(null);
    const bodyRef = useRef<TextInput>(null);

    LogBox.ignoreLogs(['@notionhq/client warn']);

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
                _onPress={_onPress}
            />
            {token && databaseId ? (
                <View style={styles.inputArea}>
                    <Animated.View
                        style={{
                            marginTop: interpolatedValue
                        }}
                    >
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
                            placeholder="How To Make A Delicious Cake"
                            placeholderTextColor={colorPalette.placeholderColor}
                            value={title}
                            onChangeText={onChangeTitle}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="done"
                            onSubmitEditing={() => bodyFocus()}
                        />
                    </Animated.View>
                    <Animated.View>
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
                            placeholder="Don't mistake salt for sugar."
                            placeholderTextColor={colorPalette.placeholderColor}
                            value={body}
                            onChangeText={onChangeBody}
                            multiline={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </Animated.View>
                </View>
            ) : (
                <View style={styles.initialScreenContainer}>
                    <Text
                        style={{
                            ...styles.initialScreenText,
                            color: colorPalette.fontColor
                        }}
                    >
                        set your token and database id
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    initialScreenContainer: {},
    initialScreenText: { marginTop: 256, fontSize: 16 },
    inputArea: {
        width: '100%',
        alignItems: 'center'
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    textInput: {
        borderRadius: 4,
        width: 360,
        paddingHorizontal: 8,
        paddingVertical: 12
    },
    titleInput: {
        marginBottom: 20
    },
    bodyInput: {
        height: 200
    }
});
