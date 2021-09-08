import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { StackParamList, SelectorState } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/actions/user';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Settings'>;
};

export const SettingsScreen: React.FC<Props> = ({ navigation }: Props) => {
    useEffect(() => {}, []);

    const dispatch = useDispatch();

    const { token, pageId } = useSelector((state: SelectorState) => state.user);

    return (
        <SafeAreaView style={styles.container}>
            <SettingsHeader navigation={navigation} />
            <TextInput
                placeholder="トークン"
                value={token}
                onChangeText={(text) => dispatch(setToken(text))}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
            />
            <Text>{pageId}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
});
