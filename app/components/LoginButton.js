import React from "react";
import colors from '../config/colors';
import { StyleSheet, TouchableOpacity, Text} from "react-native";

function LoginButton({text, onPress, color}) {
    return (
        <TouchableOpacity style={[styles.loginButton, {backgroundColor: colors[color]}]} onPress={onPress}>
            <Text style={styles.textSign}>{text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    loginButton: {
        width: '80%',
        height: 40,
        backgroundColor: colors.danger, // TODO we currently surcharge the color prop
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

export default LoginButton;