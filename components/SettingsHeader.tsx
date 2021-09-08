import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { colorScheme } from '../utils/colorScheme';
import { StackParamList, SelectorState } from '../types';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Settings'>;
};

export const SettingsHeader: React.FC<Props> = ({ navigation }: Props) => {
    const { darkMode } = useSelector((state: SelectorState) => state.user);
    const colorPalette = colorScheme(darkMode);
    return (
        <View
            style={{
                ...styles.container,
                borderColor: colorPalette.borderColor
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.headerContent, styles.settingsButtonContainer]}
            >
                <Icon name="close" size={20} style={[styles.settingsButton]} />
            </TouchableOpacity>
            <Text
                style={[
                    styles.headerContent,
                    styles.headerTitle,
                    { color: colorPalette.fontColor }
                ]}
            >
                settings
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
        marginBottom: 48
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
    }
});
