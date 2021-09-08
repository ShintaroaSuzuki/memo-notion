import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput } from 'react-native';
import { MainHeader } from '../components/MainHeader';
import { StackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
};

export const MainScreen: React.FC<Props> = ({ navigation }: Props) => {
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
        <SafeAreaView style={styles.container}>
            <MainHeader navigation={navigation} title={title} body={body} />
            <View style={styles.inputArea}>
                <Text style={styles.label}>title</Text>
                <TextInput
                    ref={titleRef}
                    style={[styles.textInput, styles.titleInput]}
                    placeholder="タイトル"
                    value={title}
                    onChangeText={onChangeTitle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="done"
                    onEndEditing={() => bodyFocus()}
                />
                <Text style={styles.label}>body</Text>
                <TextInput
                    ref={bodyRef}
                    style={[styles.textInput, styles.bodyInput]}
                    placeholder="本文"
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
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%'
    },
    inputArea: {
        width: 312
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    textInput: {
        backgroundColor: '#eee',
        borderRadius: 8,
        width: 312,
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
