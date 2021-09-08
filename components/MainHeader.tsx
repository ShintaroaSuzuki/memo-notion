import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { postToNotion } from '../utils/postToNotion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
    title: string;
    body: string;
};

export const MainHeader: React.FC<Props> = ({
    navigation,
    title,
    body
}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={[styles.headerContent, styles.settingsButtonContainer]}
            >
                <Icon
                    name="settings"
                    size={20}
                    style={[styles.settingsButton]}
                />
            </TouchableOpacity>
            <Text style={[styles.headerContent, styles.headerTitle]}>
                new memo
            </Text>
            <Text
                style={[
                    styles.headerContent,
                    styles.postButton,
                    { color: title && body ? '#007aff' : '#ccc' }
                ]}
                onPress={() =>
                    title &&
                    body &&
                    postToNotion({
                        pageId: '8067fa92c8ac46a08483bceeb4a1020e',
                        token: 'secret_hCSKm1ChCz2QpH1hEQ7TH01Rdh7ghrv6LTuBE5TY7x',
                        title,
                        body
                    })
                }
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
        borderColor: '#eee',
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
    },
    postButton: {
        right: 24
    }
});
