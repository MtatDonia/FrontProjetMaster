import React from "react";
import colors from '/app/config/colors';
import { StyleSheet, TouchableOpacity, Text} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function BoneButton({text, onPress, color}) {
    return (
        <TouchableOpacity style={[styles.boneButton, {backgroundColor: colors[color]}]} onPress={onPress}>
            <Text style={styles.textSign}><MaterialCommunityIcons name="bone" size={18} color="pink" /> {text} <MaterialCommunityIcons name="bone" size={18} color="pink" /></Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    boneButton: {
        width: '80%',
        height: 40,
        borderRadius: 25,
        bottom: 30,
        marginTop: 10,
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        top:7,
      },
});

export default BoneButton;