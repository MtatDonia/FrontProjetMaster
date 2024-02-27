import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '/app/config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const image = { uri: "https://cdn.discordapp.com/attachments/763467509759475813/1163397716374716469/Snapchat-1340042168.jpg?ex=653f6d8e&is=652cf88e&hm=f4f4e16968c2c6ff6c31a49fca9b3055a9584b98f02cbbb43454ca3ecaf1a47d&" };

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.deleteIcon}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name="trash-can" size={24} color="white" />
                </View>
            </View>
            <View style={styles.cancelIcon}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name="close" size={24} color="white" />
                </View>
            </View>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    cancelIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 40,
        left: 30,
    },
    deleteIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 40,
        right: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        left: 15,
        top: 15,
    }
});

export default ViewImageScreen;
